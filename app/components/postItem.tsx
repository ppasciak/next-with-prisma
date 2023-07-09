import React from "react";
import { PostWithUserAndImage } from "@/types/types";
import PostActions from "../post-list/postActions";
import PostComments from "./postComments";
import Image from "next/image";

type PostItemType = {
    data: PostWithUserAndImage;
};

const PostItem: React.FC<PostItemType> = ({ data }) => {
    return (
        <article className="my-2 bg-gray-200 dark:bg-gray-700 shadow-sm w-full p-2 rounded-md">
             <header className="mb-2">
                <h4>
                    {data.author.name}{" "}
                    <span className="text-gray-500 text-sm">({data.author.email})</span>
                </h4>
            </header>
            {data.image ? (
                <Image
                    blurDataURL={data.image.thumbSrc}
                    src={data.image.fullSrc}
                    placeholder="blur"
                    alt="Picture of the author"
                    width={data.image.width}
                    height={data.image.height}
                />
            ) : null}
            <div className="dark:bg-gray-800 min-h-[4rem] my-2 p-1 bg-gray-300">
                {data.content}
            </div>
            <PostActions postId={data.id} likes={data.likes || 0} />
            <PostComments postId={data.id} />
        </article>
    );
};

export default PostItem;
