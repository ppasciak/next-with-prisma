"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postPost } from "../../services/fetches";
import { isAxiosError } from "axios";
import { useToast } from "@/context/notificationContext";
import { useUserList } from "./useUserList";
import FileDropZone from "../components/fileDropZone";
import { Button } from "../components";

type FormData = {
    authorId: number;
    content: string;
    file?: File;
};

const PostForm = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { successToast, errorToast } = useToast();
    const { userList } = useUserList();

    const handleFileChange = (files: File) => {
        if (files) {
            setSelectedFile(files);
        }
    };

    const onSubmit = async (data: FormData) => {
        if (selectedFile) {
            data.file = selectedFile;
        }        
        
        try {            
            const postData = await postPost(data);            
            if ("id" in postData.data) {
                reset();
                setSelectedFile(null);
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
            <FileDropZone onFileChange={handleFileChange} fileValue={selectedFile}/>
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
            <Button type="submit">Add Post</Button>
        </form>
    );
};
export default PostForm;
