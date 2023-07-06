"use client";

import React, { createContext, useContext } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the type for the ToastContext
interface ToastContextType {
    successToast: (message: string, options?: ToastOptions) => void;
    errorToast: (message: string, options?: ToastOptions) => void;
}

const colorScheme = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

// Create a new context for toast messages
const ToastContext = createContext<ToastContextType | null>(null);

// Toast provider component
const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // Function to display a success toast
    const successToast = (message: string, options?: ToastOptions) => {
        toast.success(message, options);
    };

    // Function to display an error toast
    const errorToast = (message: string, options?: ToastOptions) => {
        toast.error(message, options);
    };

    return (
        <ToastContext.Provider value={{ successToast, errorToast }}>
            {children}
            <ToastContainer position="bottom-right" theme={colorScheme} />
        </ToastContext.Provider>
    );
};

// Custom hook to access the toast context
const useToast = (): ToastContextType => {
    const toastContext = useContext(ToastContext);

    if (!toastContext) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return toastContext;
};

export { ToastProvider, useToast };
