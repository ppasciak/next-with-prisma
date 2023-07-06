"use client";

import React, { useEffect, useState } from "react";
import { getPostComments } from "@/services/fetches";
import { PostCommentWithUser } from "@/types/types";
import Comment from "./postComment";
import AddPostComment from "./addPostComment";
import Button from "./button";

type PostCommentsProps = {
    postId: number;
};

const PostComments = ({ postId }: PostCommentsProps) => {
    const [showComments, setShowComments] = useState<Boolean>(false);
    const [commentsLoading, setCommentsLoading] = useState<Boolean>(false);
    const [postComments, setPostComments] = useState<PostCommentWithUser[]>();

    const fetchComments = async () => {
        const response = await getPostComments(postId);

        if('comments' in response.data) {
            setPostComments(response?.data.comments);
            setCommentsLoading(false);
        }

    };

    const refetchComments = () => {
        fetchComments();
    };

    useEffect(() => {
        if (showComments && !commentsLoading) {
            setCommentsLoading(true);
            fetchComments();
        }
    }, [showComments]);

    const loading = commentsLoading ? <p>Loading...</p> : null;

    const commentsList = postComments?.length ? (
        postComments.map((comment, i) => (
            <Comment key={i} data={comment} />
        ))
    ) : (
        <div className="text-gray-200 text-center text-xs">
            No comments found
        </div>
    );

    return (
        <>
            <Button type="button" action={() => setShowComments(!showComments)}>
                Show comments
            </Button>
            {showComments ? (
                <>
                    {loading || commentsList}
                    <AddPostComment
                        postId={postId}
                        updateList={refetchComments}
                    />
                </>
            ) : null}
        </>
    );
};

export default PostComments;
