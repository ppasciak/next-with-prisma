import { User as UserModel, Post as PostModel, PostComment as PostCommentModel, PostImage as PostImageModel } from "@prisma/client";

export type User = UserModel;

export type Post = PostModel;

export type PostImage = PostImageModel;

export type PostWithImage = Post & {
    image: PostImage;
}

export type PostWithUser = Post & {
    author: User;
};

export type PostWithUserAndImage = Post & {
    image: PostImage | null;
    author: User;
};

export type UserWithPost = User & {
    posts: PostWithImage[]
};

export type PostComment = PostCommentModel;

export type PostCommentWithUser =  Pick<PostComment, 'createdAt' | 'content'> & {
    author: Pick<User, 'email' | 'name'>
};

export type PostWithComments = PostComment & {
    commment: PostComment[]
}

export type ErrorResponseType = {
    error: { message: string };
};
