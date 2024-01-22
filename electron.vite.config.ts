import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), '');
  return {
    main: {
      plugins: [externalizeDepsPlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      // define: {
      //   'process.env': env
      // },
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src')
        }
      },
      plugins: [react()]
    }
  };
});
