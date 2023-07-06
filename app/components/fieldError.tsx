import React from "react";

type FieldErrorProps = {
    label: string;
};

const FieldError = ({ label }: FieldErrorProps) => {
    return <p className="text-orange-500">{label}</p>;
};
export default FieldError;
