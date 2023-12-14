import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/seasons-tour/',
  plugins: [vue()],
  build: {
    // Set the chunk size warning limit in kilobytes
    chunkSizeWarningLimit: 1000,

    // Configure manual chunks to group specific dependencies together
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: Grouping lodash into a separate chunk
          lodash: ['lodash'],
        },
      },
    },}
})
