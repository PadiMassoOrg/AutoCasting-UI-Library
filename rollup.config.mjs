import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

export default defineConfig([
  // 1) JS
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js',
      sourcemap: true,
    },
    external: ['react', 'react-dom', 'clsx'],
    plugins: [
      peerDepsExternal(),
      resolve({ extensions: ['.ts', '.tsx', '.js'] }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        jsx: 'react-jsx',
        declaration: false, // 👈 que NO emita .d.ts aquí
        emitDeclarationOnly: false,
      }),
    ],
  },
  // 2) DTS
  {
    input: 'src/index.ts', // 👈 genera tipos desde el código fuente
    output: { file: 'dist/index.d.ts', format: 'es' },
    plugins: [dts()],
  },
]);
