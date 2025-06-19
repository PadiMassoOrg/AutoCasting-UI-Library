import type { StorybookConfig } from '@storybook/react-vite';
import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: { name: '@storybook/react-vite', options: {} },

  // Inyectamos Tailwind en el Vite que usa Storybook
  viteFinal: async (cfg) => {
    cfg.css = {
      postcss: { plugins: [tailwind(), autoprefixer()] },
    };
    return cfg;
  },
};

export default config;
