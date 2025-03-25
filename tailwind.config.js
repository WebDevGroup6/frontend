/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      outline: {
        blue: ['2px solid #646cff', '2px'] // Añade esto para personalizar el outline
      }
    },
  },
  plugins: [],
}