/**
 * @type {import("tailwindcss/tailwind-config").TailwindConfig}
 */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,css}",
    "./src/(components|compounds|layouts)/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: "'Rubik', sans-serif",
        display: "'Righteous', cursive",
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
