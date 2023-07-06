"use client";

import React from "react";
import PostForm from "./postForm";
import Heading from "../components/heading";

const AddPostForm = () => {
    return (
        <>
            <Heading>Add new Post</Heading>
            <PostForm />
        </>
    );
};

export default AddPostForm;
