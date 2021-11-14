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
        sans: "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
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
