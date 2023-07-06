"use client";

import React, { useEffect, useState } from "react";
import { User } from "../../types/types";
import { useForm } from "react-hook-form";
import { getAllUsers, postPost } from "../../services/fetches";
import { isAxiosError } from "axios";
import { useToast } from "@/context/notificationContext";
import { useUserList } from "./useUserList";

type FormData = {
    authorId: number;
    content: string;
    file?: File;
};

const PostForm = () => {
    const { register, handleSubmit, reset, setValue } = useForm<FormData>();
    const [selectedFile, setSelectedFile] = useState<File>();
    const { successToast, errorToast } = useToast();
    const { userList } = useUserList();
    console.log(userList);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const onSubmit = async (data: FormData) => {
        if(selectedFile) {
            data.file = selectedFile;
        }

        try {
            const postData = await postPost(data);
            if ("id" in postData.data) {
                reset();
                successToast("Post was added!");
            }
        } catch (error) {
            if (isAxiosError(error)) {
                errorToast(error.response?.data.error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block my-2">
                image:
                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleFileChange}
                />
            </label>
            <div>
                <label className="block my-2">
                    Author:
                    <select
                        className="block"
                        {...register("authorId", { required: true })}
                    >
                        {userList &&
                            userList.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                    </select>
                </label>
            </div>
            <div>
                <label className="block my-2">
                    Content:
                    <textarea
                        className="block"
                        {...register("content", { required: true })}
                    />
                </label>
            </div>
            <button type="submit">Add Post</button>
        </form>
    );
};
export default PostForm;
