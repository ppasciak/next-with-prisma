"use client";

import React, { useEffect, useState } from "react";
import { User } from "../../types/types";
import { useForm } from "react-hook-form";
import { getAllUsers, postPostComments } from "../../services/fetches";
import { Button, FieldError } from "@/app/components";

type FormData = {
    authorId: number;
    content: string;
};

type AddPostCommentProps = {
    postId: number;
    updateList: () => void;
};

const AddPostComment = ({ postId, updateList }: AddPostCommentProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>();
    const [users, setUsers] = useState<User[]>();

    useEffect(() => {
        const fetch = async () => {
            const {data} = await getAllUsers();
            if('users' in data) {
                setUsers(data.users);
            }
        };

        fetch();
    }, []);

    const onSubmit = async (data: FormData) => {
        try {
            const postData = await postPostComments({
                ...data,
                postId: postId,
            });
            reset();
            updateList();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="block my-2">
                    Author:
                    <select
                        className="block"
                        {...register("authorId", { required: true })}
                    >
                        {users &&
                            users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                    </select>
                </label>
                {errors.authorId && (
                    <FieldError label="Author required"/>
                )}
            </div>
            <div>
                <label className="block my-2">
                    Comment:
                    <textarea
                        className="block"
                        {...register("content", { required: true })}
                    />
                </label>
                {errors.authorId && (
                    <FieldError label="Content required"/>
                )}
            </div>
            <Button type="submit">Add Comment</Button>
        </form>
    );
};
export default AddPostComment;
