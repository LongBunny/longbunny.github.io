import path from "path";
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                fireworks: 'fireworks.html'
            },
        }
    },
    resolve: {
        alias: {
            '@shared': path.resolve(__dirname, 'src/shared'),
        }
    }
});