/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greenspotify: "#1BB954",
        whitespotify: "#FFFFFF",
        blackspotify: "#191414",
      },
    },
  },
  plugins: [],
};
