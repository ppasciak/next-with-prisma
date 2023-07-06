import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "./components";
const inter = Inter({ subsets: ["latin"] });
import { ToastProvider } from "@/context/notificationContext";

export const metadata = {
    title: "Homepage",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastProvider>
                    <Header />
                    <main className="flex min-h-screen flex-col items-center md:p-24 p-4 max-w-3xl mx-auto">
                        {children}
                    </main>
                </ToastProvider>
            </body>
        </html>
    );
}
