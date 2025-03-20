import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), svgr(), tsconfigPaths()],
  build: {
    sourcemap: mode !== 'production', // generate sourcemaps only in dev/staging
    minify: 'esbuild',
    target: 'esnext',
  },
}))
