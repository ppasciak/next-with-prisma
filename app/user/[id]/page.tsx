import { getUserWithPostsById } from "@/services/fetches";
import ListItem from "../../components/postItem";

export const metadata = {
    title: "User page",
};

export default async function Page({ params }: { params: { id: number } }) {
    const { data } = await getUserWithPostsById(Number(params.id));

    let userDetails = null;
    if ("user" in data) {
        userDetails = (
            <div className="w-full">
                <h1>
                    {data.user.name} <span>({data.user.email})</span>
                </h1>
                <p>id: {data.user.id}</p>
                <div>
                    {data.user.posts.map((post) => (
                        <ListItem
                            key={post.id}
                            data={{ ...post, author: data.user }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return <>{userDetails && userDetails}</>;
}
