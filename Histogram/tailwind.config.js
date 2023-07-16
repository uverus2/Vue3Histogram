/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
     'primary': "#A74048",
     'secondary': "#8ABC8A",
     'third': "#4C7F66",
     'basic': "#97CBAE"
    }
  },
  plugins: [],
}