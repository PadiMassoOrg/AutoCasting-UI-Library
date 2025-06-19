/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}', // 👈 Incluye Storybook
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
