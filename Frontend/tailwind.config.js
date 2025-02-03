/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#1a1a2e",
        "light-green": "#c8d8be",
        "orange-main": "#ff8c42",
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-left': 'slideInLeft 1s ease-out',
      },
      colors: {
        'custom-yellow': '#f1c40f',
        'custom-orange': '#e67e22',
      },
      fontFamily:{
        'Lobster': ['Lobster'],
        'Poppins': ['Poppins'],
        'Roboto': ['Roboto'],
      }
    },
  },
  plugins: [],
};
