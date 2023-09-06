import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
    }),
    // babel({
    //   // 配置Babel选项
    //   babelHelpers: 'bundled',
    //   // 配置Babel插件
    //   plugins: [
    //     ['@babel/plugin-proposal-decorators', { legacy: true }],
    //     ['@babel/plugin-proposal-class-properties', { loose: true }],
    //   ],
    // }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 3. to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_'],
}));
