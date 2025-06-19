// eslint.config.mjs  ——  Flat Config, válido ESLint v9
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import a11y from 'eslint-plugin-jsx-a11y';

export default [
  /* 1. Ignorar rutas */
  {
    ignores: ['dist/**', 'node_modules/**', '.storybook/**'],
  },

  /* 2. Config base de TypeScript  */
  ...tseslint.configs.recommended,

  /* 3. Reglas para tus fuentes */
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': tseslint.plugin, react, 'react-hooks': hooks, 'jsx-a11y': a11y },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname, // importante
      },
    },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
];
