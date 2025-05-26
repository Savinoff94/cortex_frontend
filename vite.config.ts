import { defineConfig } from 'vitest/config'
// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  test: {
    globals: true,
    environment: 'jsdom', // 👈 Required for @testing-library/react
    setupFiles: './src/setupTests.ts',
  },
})
