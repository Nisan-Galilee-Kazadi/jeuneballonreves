/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1a365d", // Blue from the logo
                secondary: "#fbd38d", // Yellow/Gold from the logo
                accent: "#2f855a", // Green from the logo
            },
        },
    },
    plugins: [],
}
