import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    port: 4300,
    proxy: {
      '/api': {
        target: 'https://localhost:7131',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
