/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        bloom: {
          dark: "#0F1115",
          orange: "#FF5E3A",
          blue: "#3B6FE0",
          green: "#3A5A40",
          cream: "#FFF5E1",
          text: "#FFFFFF",
          "text-secondary": "#E0E0E0",
          "text-dark": "#000000",
        },
      },
      fontFamily: {
        heading: ["Akira Expanded", "sans-serif"],
        body: ["Octarine", "sans-serif"],
      },
      backgroundImage: {
        "bloom-gradient": "linear-gradient(to bottom, #2A2A3E, #0F1115)",
      },
    },
  },
  plugins: [],
};
