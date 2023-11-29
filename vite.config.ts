import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'react-pine',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react'],
    },
  },
});
