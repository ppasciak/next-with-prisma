import React from "react";
import { getAllUsers } from "@/services/fetches";
import Link from "next/link";

export const metadata = {
    title: "User list page",
};

const PostList = async () => {
    const response = await getAllUsers();
    let userElements: React.JSX.Element | React.JSX.Element[] = (
        <div>
            <h3>No users found</h3>
        </div>
    );

    if ("users" in response.data) {
        userElements = response.data.users.map((user) => (
            <li key={user.id}>
                <Link href={`/user/${user.id}`}>
                    {user.name}
                    <span className="text-gray-500">({user.email})</span>
                </Link>
            </li>
        ));
    }

    return (
        <>
            <h2>Users</h2>
            <ul className="text-left">{userElements}</ul>
        </>
    );
};

export default PostList;
