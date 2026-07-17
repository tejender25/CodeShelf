/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
    primary: "rgb(var(--primary) / <alpha-value>)",
    background: "rgb(var(--background) / <alpha-value>)",
    card: "rgb(var(--card) / <alpha-value>)",
    border: "rgb(var(--border) / <alpha-value>)",
    muted: "rgb(var(--muted) / <alpha-value>)",
},

            borderRadius: {
                xl: "1rem",
                "2xl": "1.25rem",
            },

            boxShadow: {
                card: "0 10px 30px rgba(0,0,0,0.25)",
            },
        },
    },
    plugins: [],
};