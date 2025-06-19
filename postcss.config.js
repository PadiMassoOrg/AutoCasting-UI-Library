// postcss.config.js  (ES Module porque tienes "type": "module")
import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default { plugins: [tailwind(), autoprefixer()] };
