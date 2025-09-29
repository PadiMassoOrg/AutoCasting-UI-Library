import type { StorybookConfig } from '@storybook/react-vite';
import tailwind from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'node:url';
import { URL } from 'node:url';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)', '../src/stories/**/*.stories.tsx'],
  addons: [],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: async (viteCfg) => {
    viteCfg.css = { postcss: { plugins: [tailwind(), autoprefixer()] } };

    viteCfg.resolve = {
      ...(viteCfg.resolve ?? {}),
      alias: {
        ...(viteCfg.resolve?.alias ?? {}),
        '@': fileURLToPath(new URL('../src', import.meta.url)), // 👈 alias directo a /src
      },
    };

    return viteCfg;
  },
};

export default config;
