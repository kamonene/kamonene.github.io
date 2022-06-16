import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: './src/main.tsx',
            output:{
                entryFileNames: 'app-[name].js',
                assetFileNames: 'app-[name].css',

            }
        },

        outDir: '../build',
    },
    root: "./src",

})
