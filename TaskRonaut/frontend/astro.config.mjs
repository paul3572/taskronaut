import {defineConfig} from 'astro/config';


export default defineConfig({
    output: 'server', // or 'hybrid'
    server: {
        port: 4321,
    },
});
