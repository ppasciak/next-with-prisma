"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { postUser } from "@/services/fetches";
import { Button, FieldError } from "@/app/components";
import { useToast } from "@/context/notificationContext";
import { isAxiosError } from "axios";

type FormValues = {
    name: string;
    email: string;
};

export const UserForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();
    const { successToast, errorToast } = useToast();

    const handleAddUser: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await postUser(data);
            if ("id" in response.data) {
                reset();
                successToast("User created successfully");
            }
        } catch (error) {
            if (isAxiosError(error)) {
                errorToast(error.response?.data.error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(handleAddUser)}>
            <label className="block" htmlFor="user-name">
                Name:
                <input
                    className="block my-2"
                    type="text"
                    {...register("name")}
                />
                {errors.name && <FieldError label="Invalid name" />}
            </label>
            <label className="block" htmlFor="user-email">
                Email:
                <input
                    className="block my-2"
                    type="text"
                    {...register("email", {
                        required: true,
                        pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    })}
                />
                {errors.email && <FieldError label="Invalid emai" />}
            </label>
            <Button type="submit">Add</Button>
        </form>
    );
};

export default UserForm;
