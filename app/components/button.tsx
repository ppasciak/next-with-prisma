import React, { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(["border-primary-700", "border"], {
    variants: {
        variant: {
            primary: ["bg-primary-700"],
            secondary: [],
        },
        size: {
            sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
            lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"],
        },
        underline: { true: ["underline"], false: [] },
    },
    defaultVariants: {
        variant: "primary",
        size: "sm",
    },
});

interface ButtonProps
    extends React.ComponentPropsWithoutRef<"button">,
        VariantProps<typeof button> {
    action?: () => void;
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    action,
    children,
    variant,
    size,
    ...rest
}) => {
    return (
        <button
            // className="p-1 border border-primary-700 disabled:bg-gray-500"
            className={button({ variant, size })}
            onClick={action}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
