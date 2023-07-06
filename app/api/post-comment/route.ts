import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { ErrorResponseType } from "@/types/types";

type SuccessType = {
    postComment: any;
};

export type PostPostCommentType = SuccessType | ErrorResponseType;

export async function POST(
    request: Request
): Promise<NextResponse<PostPostCommentType>> {
    const body = await request.json();

    if (!body.postId || !body.authorId || !body.content) {
        return NextResponse.json({
            error: { message: "Missing authorId or content" },
        });
    }

    const postComment = await prisma.postComment.create({
        data: {
            content: body.content,
            authorId: Number(body.authorId),
            postId: body.postId,
            createdAt: new Date().toISOString(),
        },
    });

    return NextResponse.json({ postComment });
}
