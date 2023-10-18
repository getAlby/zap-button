import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import * as packageJson from './package.json'
// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    dts({
      include: ['src/components/'],
    }),
    react(),
    tsConfigPaths()
  ],
  build: {
    lib: {
      entry: resolve('src', 'components/index.ts'),
      name: 'ZapButton',
      formats: ['es', 'umd'],
      fileName: (format) => `zap-button.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: "React",
          "react-dom": 'ReactDOM'
        }
      }
    },
  },
}))
