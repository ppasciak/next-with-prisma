import React from "react";
import { getAllUsers } from "@/services/fetches";
import Link from "next/link";
import Heading from "../components/heading";
import Message from "../components/message";

export const metadata = {
    title: "User list page",
};

const PostList = async () => {
    const response = await getAllUsers();
    let userElements: React.JSX.Element | React.JSX.Element[] = (
        <Message variant={"warning"}>No users find</Message>
    );

    if ("users" in response.data && response.data.users.length) {
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
            <Heading variant={"primary"}>Users</Heading>
            <ul className="text-left">{userElements}</ul>
        </>
    );
};

export default PostList;
