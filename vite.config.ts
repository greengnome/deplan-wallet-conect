import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  base: '/deplan-wallet-conect/',
  define: {
    'process.env': {},
    global: {}
  },
  server: {
    port: 5174,
  }
})
