import React from "react";
import Link from "next/link";

const navItems = [
    {
        label: "Add Post",
        url: "/add-post",
    },
    {
        label: "Add User",
        url: "/add-user",
    },
    {
        label: "User list",
        url: "/user-list",
    },
    {
        label: "Post list",
        url: "/post-list",
    },
];

const Header = () => {
    return (
        <header className="sticky max-w-3xl mx-auto py-2">
            <nav>
                <ul className="flex justify-between">
                    {navItems.map((link) => (
                        <Link key={link.url} href={link.url}>
                            {link.label}
                        </Link>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
