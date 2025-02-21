import { defineConfig } from 'astro/config';
import node from "@astrojs/node";

export default defineConfig({
    output: 'server',
    adapter: node({mode: "standalone"}),
    server: {
        host: true,
        port: 4321,
        strictPort: true,
    },
    vite: {
        server: {
            hmr: {
                host: 'taskronaut.at', // Domain, über die deine Seite erreichbar ist
                port: 4321,            // Muss mit deinem Dev-Server-Port übereinstimmen
                protocol: 'ws'         // Bei HTTPS ggf. auf 'wss' ändern
            },
            allowedHosts: ['taskronaut.at'],
            // allowLocalhost ist in Vite nicht standardmäßig dokumentiert – eventuell unnötig
        }
    }
});