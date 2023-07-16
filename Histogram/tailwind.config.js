/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              'primary': "#A74048",
              'secondary': "#8ABC8A",
              'third': "#4C7F66",
              'basic': "#97CBAE",
              'white': "#ffffff"
          },
          screens: {
              'xs-250': '250px',
              'xs-450': '450px'
          }
      },
  },
  plugins: [],
}