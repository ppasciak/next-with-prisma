import React from "react";
import UserForm from "./userForm";
import Heading from "../components/heading";

export const metadata = {
    title: "Add user page",
};

const AddUser = () => {
    return (
        <>
            <Heading>Add User</Heading>
            <UserForm />
        </>
    );
};

export default AddUser;
