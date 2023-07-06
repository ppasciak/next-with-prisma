import React, { ReactNode } from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    action?: () => void;
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ action, children, ...rest }) => {
    return (
        <button
            className="p-1 border border-white disabled:bg-gray-500"
            onClick={action}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
