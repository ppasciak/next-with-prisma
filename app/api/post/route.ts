import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import path, { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";
import { buffer } from "stream/consumers";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { ErrorResponseType } from "@/types/types";

type SuccessType = {
    id: number;
};

export type PostPostType = SuccessType | ErrorResponseType;

enum SIZES {
    FULL = "full",
    THUMB = "thumb",
}

export async function POST(
    request: Request
): Promise<NextResponse<PostPostType>> {
    const formData = await request.formData();

    const authorId = formData.get("authorId")?.toString();
    const content = formData.get("content")?.toString();
    const file = formData.get("file") as Blob | null;

    if (!authorId || !content) {
        return NextResponse.json(
            { error: { message: "Missing authorId or content" } },
            { status: 400 }
        );
    }

    const postData = await prisma.post.create({
        data: {
            content: content,
            authorId: Number(authorId),
            likes: 0,
        },
    });

    if (file) {
        const imageSrc = await handleWriteImage(file);
        if (SIZES.FULL in imageSrc) {
            const postImage = await prisma.postImage.create({
                data: {
                    fullSrc: imageSrc.full,
                    thumbSrc: imageSrc.thumb,
                    postId: postData.id,
                    width: imageSrc.width,
                    height: imageSrc.height,
                },
            });
        }
    }

    return NextResponse.json({ id: postData.id });
}

const handleWriteImage = async (
    file: Blob
): Promise<
    | NextResponse<ErrorResponseType>
    | { thumb: string; full: string; height: number; width: number }
> => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const imageId = uuidv4();

    const outputDirs = await createFolders(imageId);
    if (!outputDirs) {
        return NextResponse.json(
            { error: { message: "Something went wrong" } },
            { status: 500 }
        );
    }

    const image = await sharp(buffer);
    const imageMeta = await image.metadata();
    const filename = getFilename(file.name, file.type);

    try {
        await writeFile(`${outputDirs[SIZES.FULL]}/${filename}`, buffer);

        const thumbnailBuffer = image.resize(20);
        await writeFile(
            `${outputDirs[SIZES.THUMB]}/${filename}`,
            thumbnailBuffer
        );

        return {
            ...getRelativeUls(imageId, filename),
            width: imageMeta.width || 0,
            height: imageMeta.height || 0,
        };
    } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return NextResponse.json(
            { error: { message: "Something went wrong" } },
            { status: 500 }
        );
    }
};

const createFolders = async (imageId: string) => {
    const uploadDirs: { [key: string]: string } = {};
    for (const size of Object.values(SIZES)) {
        const sizeDir = getDestination(size, imageId);
        uploadDirs[size] = sizeDir;

        try {
            await stat(sizeDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(sizeDir, { recursive: true });
            } else {
                console.error(
                    "Error while trying to create directory when uploading a file\n",
                    e
                );
                return null;
            }
        }
    }

    return uploadDirs;
};

type SizeObject = {
    [K in SIZES]: string;
};

const getRelativeUls = (imageId: string, filename: string) => {
    const uploadDirs: SizeObject = {
        thumb: "",
        full: "",
    };

    for (const size of Object.values(SIZES)) {
        const sizeDir = getDestination(size, imageId, true);
        uploadDirs[size] = join(sizeDir, filename);
    }
    return uploadDirs;
};

const getFilename = (name: string, type: string): string => {
    return `${name.replace(/\.[^/.]+$/, "")}-full.${mime.getExtension(type)}`;
};

const getDestination = (type: string, id: string, relative = false) => {
    return join(
        relative ? "" : process.cwd(),
        relative ? "" : "/public",
        "/uploads/",
        id,
        type
    );
};

const getAspectRatio = (meta: { height?: number; width?: number }) => {
    if (!meta.width || !meta.height) return 0;
    return meta.width / meta.height;
};
