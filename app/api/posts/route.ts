import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import {
    PostWithUserAndImage,
    ErrorResponseType,
    PostImage,
    Post,
    User,
} from "@/types/types";

type SuccessType = {
    posts: PostWithUserAndImage[]
};

export type GetPostsType = SuccessType | ErrorResponseType;

export async function GET(
    request: Request
): Promise<NextResponse<GetPostsType>> {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            image: true,
        },
    });

    return NextResponse.json({ posts: posts });
}
