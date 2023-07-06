import { getAllPosts } from "@/services/fetches";
import PostItem from "../components/postItem";

const PostList = async () => {
    const { data } = await getAllPosts();
    let postElements;

    if ("posts" in data) {
        postElements = data.posts.map((post) => (
            <li key={post.id}>
                <PostItem data={post} />
            </li>
        ));
    }

    return (
        <>
            <h2>Posts</h2>
            <ul className="text-left w-full">{postElements}</ul>
        </>
    );
};

export default PostList;
