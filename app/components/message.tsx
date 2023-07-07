import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const message = cva(["p-2", "border", "my-2", "w-full", "rounded-sm"], {
    variants: {
        variant: {
            info: ["border-cyan-800", "bg-cyan-800/50", "text-white"],
            warning: [
                "border-amber-500",
                "bg-amber-500/50",
                "text-amber-900",
                "dark:text-white",
            ],
            error: [
                "border-red-500",
                "bg-red-500/50",
                "text-red-950",
                "dark:text-white",
            ],
            success: [
                "border-lime-800",
                "bg-lime-800/50",
                "text-lime-900",
                "dark:text-white",
            ],
        },
    },
    defaultVariants: {
        variant: "info",
    },
});

interface MessageProps extends VariantProps<typeof message> {
    children: React.ReactNode;
}

const Message = ({ children, variant = "info" }: MessageProps) => {
    return <div className={message({ variant })}>{children}</div>;
};
export default Message;
