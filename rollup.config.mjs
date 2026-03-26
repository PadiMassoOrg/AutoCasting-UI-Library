import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

function svgAssetPlugin() {
  return {
    name: 'svg-asset-plugin',
    async load(id) {
      if (!id.endsWith('.svg')) return null;

      const source = await readFile(id);
      const referenceId = this.emitFile({
        type: 'asset',
        name: path.basename(id),
        source,
      });

      return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`;
    },
  };
}

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
      assetFileNames: 'assets/[name][extname]',
      sourcemap: false,
    },
    external: ['react', 'react-dom', 'clsx'],
    plugins: [
      peerDepsExternal(),
      svgAssetPlugin(),
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

  // 2) DTS
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts', format: 'es' },
    plugins: [dts()],
  },
]);
