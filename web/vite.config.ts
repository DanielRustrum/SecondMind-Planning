import { defineConfig, loadEnv } from 'vite'
import "process" 
import * as path from "path"
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    build: {
      outDir: "../.temp/",
    },
    css: { preprocessorOptions: { scss: { api: 'modern-compiler' }}},
    plugins: [react()],
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "src/assets"),
        "@components": path.resolve(__dirname, "src/components"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@functions": path.resolve(__dirname, "src/functions"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@router": path.resolve(__dirname, "src/components/core/Shell/Shell"),
      }
    }
  }
})