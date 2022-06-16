import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: './src/main.tsx'
        },
        outDir: '../build',
    },
    root: "./src"
})
