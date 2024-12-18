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
    },
  },
  plugins: [],
};
