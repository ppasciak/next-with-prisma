import client from "./client";
import { User, Post, PostReactionType } from "../types/types";
import {
    PostUserResponseType,
    GetUserResponseType,
    GetUsersResponseType,
    GetUserWithPostsType,
    GetPostsType,
    UpdatePostLikesType,
    PostPostType,
    GetPostCommentsType,
    PostPostCommentType,
} from "../app/api/types";

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
    type: PostReactionType;
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
