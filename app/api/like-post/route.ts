import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { PostReactionType, ErrorResponseType } from "@/types/types";

type SuccessType  = {
    likes: number;
}

export type UpdatePostLikesType = SuccessType | ErrorResponseType;

const updateLikes = (current: number, type: PostReactionType) => {
    if(type === 'unlike' &&  current === 0) return 0;
    if(type === 'unlike') return current - 1;
    if(type === 'like') return current + 1;
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
): Promise<NextResponse<UpdatePostLikesType>> {
    const body = await request.json();

    if (!body.postId || !body.type) {
        return NextResponse.json(
            { error: { message: "Missing post ID or action type" } },
            { status: 400 }
        );
    }

    const currentCount = await prisma.post.findUnique({
        where: {
            id: body.postId,
        },
        select: {
            likes: true,
        },
    });

    if (!currentCount) {
        return NextResponse.json(
            { error: { message: "S#it happened, post not found..." } },
            { status: 500 }
        );
    }

    const newLikesCount = updateLikes(Number(currentCount.likes), body.type);


    const updatedPost = await prisma.post.update({
        where: {
            id: body.postId,
        },
        data: {
            likes: newLikesCount,
        },
    });

    return NextResponse.json({ likes: Number(updatedPost.likes) });
}
