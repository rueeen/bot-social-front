import { defineConfig } from 'vite';
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  build: { rollupOptions: { output: { manualChunks(id) {
    if (id.includes('node_modules')) {
      if (/recharts|d3-|victory|react-smooth|decimal|es-toolkit|eventemitter|tiny-invariant/.test(id)) return 'graficos';
      return 'dependencias';
    }
  } } } },
});
