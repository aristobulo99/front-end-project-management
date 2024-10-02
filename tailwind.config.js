/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        pinkCustom: '#FF70DB',
        blueCustom: '#0037FF',
      },
      fontFamily: {
        crimson: ['Crimson Text', 'serif'],
      },
    },
  },
  plugins: [],
}

