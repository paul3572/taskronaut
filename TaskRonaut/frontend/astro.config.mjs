import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: true,
        port: 4321,
        strictPort: true,
        allowedHosts: ['localhost', 'taskronaut.at'],
    }
});