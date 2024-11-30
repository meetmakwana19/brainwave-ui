import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import svgr from "@svgr/rollup";
// import stdLibBrowser from 'vite-plugin-node-stdlib-browser';
import commonjs from 'vite-plugin-commonjs';

// https://vite.dev/config/
export default () => {
  return defineConfig({
    // plugins: [react(), cssInjectedByJsPlugin( { relativeCSSInjection: true, }), libCss()],
    plugins: [
      react(),
      svgr(),
      cssInjectedByJsPlugin(),
      // stdLibBrowser(), // Polyfill for Node.js core modules in browser
      commonjs(),
    ],
    build: {
      rollupOptions: {
        input: "src/main.tsx",
        output: {
          format: "umd",
          entryFileNames: "app.bundle.js",
          // manualChunks: undefined,
        },
      },
      cssCodeSplit: false,
    },
  });
};
