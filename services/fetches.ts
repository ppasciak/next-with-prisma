import client from "./client";
import {
    User,
    Post,
} from "../types/types";
import { PostUserResponseType } from "../app/api/user/route";
import { GetUserResponseType } from "../app/api/user/[id]/route";
import { GetUsersResponseType } from "../app/api/users/route";
import { GetUserWithPostsType } from "../app/api/user-with-posts/[id]/route";
import { GetPostsType } from "../app/api/posts/route";
import { UpdatePostLikesType } from "../app/api/like-post/route";
import { PostPostType } from "../app/api/post/route";
import { GetPostCommentsType } from "../app/api/post-comments/[id]/route";
import { PostPostCommentType } from "../app/api/post-comment/route";

export const getAllUsers = async () => {
    const response = await client.get<GetUsersResponseType>("/users");
    return response;
};

type PostUsersPayload = Partial<User>;

export const postUser = async (data: PostUsersPayload) => {
    const response = await client.post<PostUserResponseType>("/user", data);
    return response;
};

type PostPostPayload = Partial<Post>;

export const postPost = async (data: PostPostPayload) => {
    const response = await client.post<PostPostType>("/post", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
};

export const getAllPosts = async () => {
    const response = await client.get<GetPostsType>("/posts");
    return response;
};

type ReactToPostPayload = {
    postId: number;
    type: "like" | "unlike";
};

export const reactToPost = async (data: ReactToPostPayload) => {
    const response = await client.put<UpdatePostLikesType>("/like-post", data);
    return response;
};

export const getUserById = async (id: number) => {
    const response = await client.get<GetUserResponseType>(`/user/${id}`);
    return response;
};

export const getUserWithPostsById = async (id: number) => {
    const response = await client.get<GetUserWithPostsType>(
        `/user-with-posts/${id}`
    );
    return response;
};

export const getPostComments = async (id: number) => {
    const response = await client.get<GetPostCommentsType>(
        `/post-comments/${id}`
    );
    return response;
};

type PostPostCommentsPayload = {
    content: string;
    postId: number;
    authorId: number;
};

export const postPostComments = async (data: PostPostCommentsPayload) => {
    const response = await client.post<PostPostCommentType>(
        `/post-comment`,
        data
    );
    return response;
};
