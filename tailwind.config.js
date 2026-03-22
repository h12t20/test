/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "src/**/*.{js,jsx,ts,tsx}", // без точки в начале (для некоторых версий сборщика)
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}