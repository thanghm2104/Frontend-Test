import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@hooks': '/src/hooks',
      '@types': '/src/types',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@i18n': '/src/i18n',
    },
  },
})
