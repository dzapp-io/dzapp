/**
 * @type {import("tailwindcss/tailwind-config").TailwindConfig}
 */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,css}",
    "./src/(components|compounds|layouts)/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bluegray: "#0f172a",
        nearblack: "#0a0a11",
      },
      fontFamily: {
        sans: "'Rubik', sans-serif",
        display: "'Righteous', cursive",
        "display-2": "'Bungee Outline', cursive",
        mono: "'Fira Code', monospace",
      },
      backgroundImage: (_theme) => ({
        twoTone1: "linear-gradient(110deg, #393947 60%, #EAEAF2 60%)",
      }),
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
