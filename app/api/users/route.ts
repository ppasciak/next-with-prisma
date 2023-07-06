import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { User, ErrorResponseType } from "@/types/types";

type SuccessType  = {
    users: User[];
}

export type GetUsersResponseType = SuccessType | ErrorResponseType;

export async function GET(): Promise<NextResponse<GetUsersResponseType>> {
    const users = await prisma.user.findMany({
        include: {
            _count: {
                select: { posts: true },
            },
        },
    });

    return NextResponse.json({ users: users });
}
