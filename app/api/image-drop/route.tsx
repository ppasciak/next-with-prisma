import sharp from "sharp";
import { NextResponse, NextRequest } from "next/server";
import { stat, mkdir, writeFile } from "fs/promises";
import path, { join } from "path";
import mime from "mime";
import { v4 as uuidv4 } from "uuid";


enum SIZES {
    FULL = "full",
    THUMB = "thumb",
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const file = formData.get("file") as Blob | null;

    if (!file) {
        return NextResponse.json(
            { error: "File blob is required." },
            { status: 400 }
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/`;
    const imageId = uuidv4();
    const uploadDirs: { [key: string]: string } = {};

    for (let size of Object.values(SIZES)) {
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
                return NextResponse.json(
                    { error: "Something went wrong." },
                    { status: 500 }
                );
            }
        }
    }

    const image = await sharp(buffer);
    const imageMeta = await image.metadata();
    const aspectRatio = getAspectRatio(imageMeta);

    const filename = getFilename(file.name, file.type);

    try {
        await writeFile(`${uploadDirs[SIZES.FULL]}/${filename}`, buffer);

        const thumbnailBuffer = image.resize(20);
        await writeFile(`${uploadDirs[SIZES.THUMB]}/${filename}`, thumbnailBuffer);
    } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
    
    return NextResponse.json({
        fileUrl: `${relativeUploadDir}/${filename}`,
    });
}

const getFilename = (name: string, type: string): string => {
    return `${name.replace(/\.[^/.]+$/, "")}-full.${mime.getExtension(type)}`;
};

const getDestination = (type: string, id: string) => {
    return join(process.cwd(), "public", "/uploads/", id, type);
};

const getAspectRatio = (meta: { height?: number; width?: number }) => {
    if (!meta.width || !meta.height) return 0;
    return meta.width / meta.height;
};
