/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    900: "#a67a00",
                    700: "#fcba03",
                    500: "#ffc219",
                    300: "#f7c948",
                    200: "#fcd462",
                    100: "#fad97a",
                    50: "#ffe9ab",
                },
            }
        },
    },
    plugins: [],
};
