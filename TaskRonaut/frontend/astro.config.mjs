import {defineConfig} from 'astro/config';
import node from "@astrojs/node";

export default defineConfig({
    output: 'server',
    adapter: node({mode: "standalone"}),
    server: {
        host: true,
        port: 4321,
        strictPort: true,
    }, vite: {
        server: {
            host: 'taskronaut.at', // Domain, über die deine Seite erreichbar ist
            port: 4321,            // Muss mit deinem Dev-Server-Port übereinstimmen
            allowedHosts: ['taskronaut.at'],
            strictPort: true, // Verhindert Port-Wechsel
            hmr: {
                clientPort: 4321 // Wichtig bei Proxys/Port-Forwarding
            }
        }
    }
});