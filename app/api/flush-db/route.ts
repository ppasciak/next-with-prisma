import { NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { ErrorResponseType } from "@/types/types";

type SuccessType = {
    success: boolean;
};

export type UpdatePostLikesType = SuccessType | ErrorResponseType;

export async function GET(): Promise<NextResponse<UpdatePostLikesType>> {
    try {
        const removeUsers = prisma.user.deleteMany();
        const removePosts = prisma.post.deleteMany();
        const removeImages = prisma.postImage.deleteMany();
        const removeComments = prisma.postComment.deleteMany();

        prisma.$transaction([removeComments, removeImages, removePosts, removeUsers]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);

        return NextResponse.json({
            error: { message: "Something went wrong..." },
        });
    }
}
