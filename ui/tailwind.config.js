/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: { bg: "#E4E4E4", secondary: "#F4F6F8" },
      },
    },
  },
  plugins: [],
};
