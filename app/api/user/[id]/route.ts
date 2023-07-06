import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { User } from "@/types/types";

type SuccessType  = {
    user: User;
}

type ErrorType = {
    error: { message: string };
}

export type GetUserResponseType = SuccessType | ErrorType;

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
): Promise<NextResponse<GetUserResponseType>> {
    const id = params.id;

    if (!id) {
        return NextResponse.json(
            { error: { message: "Missing user ID" } },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!user) {
        return NextResponse.json({ error: { message: "User not found" } });
    }

    return NextResponse.json({ user });
}
