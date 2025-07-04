import '../src/styles/tailwind.css'; // ← primera línea

import type { Preview } from '@storybook/react';
export default {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ }, disableSaveFromUi: true },
    options: {
      storySort: {
        order: ['📘 Introduction', '*'],
      },
    },
  },
} satisfies Preview;
