import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:11434',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''), // Ollama expects /api/generate so we might NOT need to rewrite if we call /api/generate from frontend.
                // Wait, ollama endpoint is localhost:11434/api/generate.
                // If frontend calls /api/generate, it matches /api, proxies to localhost:11434/api/generate? 
                // No, target is base. Request /api/generate -> localhost:11434/api/generate. This is correct.
            }
        }
    }
})
