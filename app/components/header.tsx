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
        <header className="sticky top-0 bg-gray-100/75 dark:bg-gray-900/75 py-4 backdrop-blur-sm">
            <nav className="max-w-3xl mx-auto">
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
