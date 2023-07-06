import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { UserWithPost, ErrorResponseType } from "@/types/types";

type SuccessType  = {
    user: UserWithPost;
}

export type GetUserWithPostsType = SuccessType | ErrorResponseType;

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
): Promise<NextResponse<GetUserWithPostsType>> {
    const id = params.id;

    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            posts: {
                include: {
                    image: true,
                }
            }
        },
    });

    if (!user) {
        return NextResponse.json(
            { error: { message: "Cant find user" } },
            { status: 400 }
        );
    }

    return NextResponse.json({ user });
}
