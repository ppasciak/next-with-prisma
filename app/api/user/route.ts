import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { ErrorResponseType } from "@/types/types";

type SuccessType = {
    id: number;
};

export type PostUserResponseType = SuccessType | ErrorResponseType;

export async function POST(
    request: Request
): Promise<NextResponse<PostUserResponseType>> {
    const body = await request.json();

    if (!body.name || !body.email) {
        return NextResponse.json(
            { error: { message: "Missing data" } },
            { status: 400 }
        );
    }

    const existingUser = await prisma.user.findMany({
        where: {
            email: body.email,
        },
    });

    if (existingUser.length)
        return NextResponse.json(
            { error: { message: "User exist" } },
            { status: 400 }
        );

    const user = await prisma.user.create({
        data: { name: body.name, email: body.email },
    });

    return NextResponse.json({ id: user.id });
}
