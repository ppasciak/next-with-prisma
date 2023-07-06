import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { PostCommentWithUser, ErrorResponseType } from "@/types/types";

type SuccessType  = {
    comments: PostCommentWithUser[];
}

export type GetPostCommentsType = SuccessType | ErrorResponseType;

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
    ): Promise<NextResponse<GetPostCommentsType>> {
    const id = params.id;

    if (!id) {
        return NextResponse.json(
            {error: { message: "Missing post ID" }},
            { status: 400 }
        );
    }

    const comments = await prisma.post.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            comment: {
                select: {
                    createdAt: true,
                    content: true,
                    author: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });

    if(!comments) return NextResponse.json({ comments: [] });

    return NextResponse.json({ comments: comments.comment });
}
