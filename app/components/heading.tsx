import React from "react";
import { Bodoni_Moda } from "next/font/google";
import { cva, type VariantProps } from "class-variance-authority";

const bodoni_moda = Bodoni_Moda({ subsets: ["latin"] });

const headingVariants = cva(["font-bold", bodoni_moda.className], {
    variants: {
        size: {
            h1: ["md:text-5xl text-3xl"],
            h2: ["md:text-3xl text-2xl"],
            h3: ["md:text-xl text-l"],
        },
        variant: {
            primary: ["text-primary-700"],
        },
    },
    defaultVariants: {
        size: "h1",
    },
});

interface HeadingProps extends VariantProps<typeof headingVariants> {
    children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
    size = "h1",
    children,
    variant,
}) => {
    const HeadingTag = `${size}` as keyof JSX.IntrinsicElements;

    return (
        <HeadingTag className={headingVariants({ variant, size })}>
            {children}
        </HeadingTag>
    );
};

export default Heading;
