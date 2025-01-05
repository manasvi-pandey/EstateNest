/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto-Regular", "sans-serif"],
                "roboto-light": ["Roboto-Light", "sans-serif"],
                "roboto-medium": ["Roboto-Medium", "sans-serif"],
                "roboto-bold": ["Roboto-Bold", "sans-serif"],
                "roboto-black": ["Roboto-Black", "sans-serif"],
            },
            colors: {
                primary: {
                    100: "#E2F3EA",
                    200: "#99D6B4",
                    300: "#2C6E49",
                },
                accent: {
                    100: "#FBFBFD",
                },
                black: {
                    DEFAULT: "#000000",
                    100: "#8C8E98",
                    200: "#666876",
                    300: "#191D31",
                },
                danger: "#F75555",
            },
        },
    },
    plugins: [],
};
