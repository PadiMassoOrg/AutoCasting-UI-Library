import type { StorybookConfig } from '@storybook/react-vite';
import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: { name: '@storybook/react-vite', options: {} },

  viteFinal: async (viteCfg) => {
    viteCfg.css = {
      postcss: { plugins: [tailwind(), autoprefixer()] },
    };
    return viteCfg;
  },
};

export default config;
