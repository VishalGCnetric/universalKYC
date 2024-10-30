/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #faf2da 0%, #f3d9d2 100%)',
        'cool-gradient': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      }
    },
  },
  plugins: [],
}
