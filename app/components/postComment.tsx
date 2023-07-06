import React from "react";
import { PostCommentWithUser } from "@/types/types";
import moment from "moment";

type PostCommentProps = {
    data: PostCommentWithUser;
};

const PostComment = ({ data }: PostCommentProps) => {
    return (
        <div className="bg-gray">
            <div className="dark:bg-gray-900 bg-gray-100 border-b borer-gray-500 my-1 p-2">
                {data.content}
            </div>
            <div className="text-xs text-right">
                <span>{data.author.name} ({data.author.email}) </span>
                <span className="text-gray-300">{moment(data.createdAt).fromNow()}</span>
            </div>
        </div>
    );
};

export default PostComment;
