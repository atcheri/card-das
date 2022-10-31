/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        siteblack: '#170F11',
        siteDimBlack: '#1E1A1D',
        siteFooter: '#17140F',
        siteBlue: '#0E79B2',
        siteRed: '#C33149',
        siteViolet: '#5F4B66',
        siteWhite: '#9eacc7',
      },
      fontFamily: {
        gundam: ['Plavsky Condensed', 'sans-serif'],
        omega: ['omega-centauri-Medium', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
