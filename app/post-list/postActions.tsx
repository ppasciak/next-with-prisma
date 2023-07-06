"use client";

import React, { useState } from "react";
import { reactToPost } from "@/services/fetches";
import Button from '../components/button';
import { PostReactionType } from "@/types/types";

type PostActionsProps = {
    likes: number;
    postId: number;
};

const PostActions: React.FC<PostActionsProps> = ({ likes, postId }) => {
    const [currentLikes, setCurrentLikes] = useState(likes);
    const [disableButtons, setDisableButtons] = useState(false);

    const handleClick = async (type: PostReactionType) => {
        setDisableButtons(true)
        const {data} = await reactToPost({ postId, type });
        if('likes' in data) {
            setCurrentLikes(data.likes || 0);
            setDisableButtons(false)
        }
    };

    return (
        <div className="flex justify-end text-sm gap-0.5 items-center">
            <span className="">{currentLikes}</span>{" "}
            <Button onClick={() => handleClick('like')} disabled={disableButtons}>
                Like
            </Button>
            <Button onClick={() => handleClick('unlike')} variant="secondary" disabled={disableButtons}>
                Dislike
            </Button>
        </div>
    );
};

export default PostActions;
