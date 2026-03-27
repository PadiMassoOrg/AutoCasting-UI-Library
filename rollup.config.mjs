import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import { readFile } from 'node:fs/promises';

function svgToDataUrlPlugin() {
  return {
    name: 'svg-to-data-url-plugin',
    async load(id) {
      if (!id.endsWith('.svg')) return null;

      const svg = await readFile(id, 'utf8');

      const cleaned = svg
        .replace(/\r?\n|\r/g, '')
        .replace(/\t/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();

      const encoded = encodeURIComponent(cleaned)
        .replace(/%20/g, ' ')
        .replace(/%3D/g, '=')
        .replace(/%3A/g, ':')
        .replace(/%2F/g, '/');

      return `export default "data:image/svg+xml,${encoded}";`;
    },
  };
}

export default defineConfig([
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js',
      sourcemap: false,
    },
    external: ['react', 'react-dom', 'clsx'],
    plugins: [
      peerDepsExternal(),
      svgToDataUrlPlugin(),
      resolve({ extensions: ['.ts', '.tsx', '.js'] }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        jsx: 'react-jsx',
        declaration: false,
        emitDeclarationOnly: false,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts', format: 'es' },
    plugins: [dts()],
  },
]);
