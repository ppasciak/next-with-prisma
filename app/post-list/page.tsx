import { getAllPosts } from "@/services/fetches";
import PostItem from "../components/postItem";
import Heading from "../components/heading";
import Message from "../components/message";

const PostList = async () => {
    const { data } = await getAllPosts();
    let postElements: JSX.Element | JSX.Element[] = (
        <Message variant={"warning"}>No posts find</Message>
    );

    if ("posts" in data && data.posts.length) {
        postElements = data.posts.map((post) => (
            <li key={post.id}>
                <PostItem data={post} />
            </li>
        ));
    }

    return (
        <>
            <Heading variant={"primary"}>Posts</Heading>
            <ul className="text-left w-full">{postElements}</ul>
        </>
    );
};

export default PostList;
