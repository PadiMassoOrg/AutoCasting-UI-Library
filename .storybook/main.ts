import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: { name: '@storybook/react-vite', options: {} },

  // ► Obligamos a Vite (el bundler de Storybook) a usar PostCSS + Tailwind
  viteFinal: async (viteCfg) => {
    viteCfg.css = {
      postcss: { plugins: [tailwindcss(), autoprefixer()] },
    };
    return viteCfg;
  },
};

export default config;
