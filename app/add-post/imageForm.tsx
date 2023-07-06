import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/context/notificationContext";
import client from "@/services/client";

export const ImageForm = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { successToast, errorToast } = useToast();
    const [selectedFile, setSelectedFile] = useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const onSubmit = async (data: any) => {
        if (!selectedFile) {
            errorToast("Missing file");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await client.post("/image-drop", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block my-2">
                        image:
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <button type="submit">Add Post</button>
            </form>
        </>
    );
};

export default ImageForm;
