/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        gundam: ['Plavsky Condensed', 'sans-serif'],
        omega: ['omega-centauri-Medium', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
