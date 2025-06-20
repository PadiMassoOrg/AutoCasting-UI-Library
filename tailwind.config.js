/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './.storybook/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    { pattern: /.*/ }, // 💥 Fuerza todas las clases posibles
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
