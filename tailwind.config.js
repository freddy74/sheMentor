/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["build/*.html"],
    theme: {
        extend: {
            colors: {
                primary: "#03595a",
                secondary: "#cd7f72",
            },

            fontFamily: {
                sans: ['"Poppins"', "sans-serif"],
            },
        },
    },
    plugins: [],
};
