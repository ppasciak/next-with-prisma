import React from "react";
import UserForm from "./userForm";

export const metadata = {
    title: "Add user page",
};

const AddUser = () => {
    return (
        <>
            <h2>Add User</h2>
            <UserForm />
        </>
    );
};

export default AddUser;
