module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/(components|compounds|layouts)/**/*.{js,ts,jsx,tsx}",
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
