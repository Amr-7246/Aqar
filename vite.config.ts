import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    // server: {
    //     host: 'localhost', // Force it to resolve correctly
    //     hmr: {
    //         host: 'localhost',
    //     },
    // },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        // VitePWA({
        //   registerType: 'autoUpdate',
        //   injectRegister: 'auto',
        //   // devOptions: {
        //   //   enabled: true, // This enables PWA features in development mode
        //   //   type: 'module',
        //   // },
        //   manifest: {
        //     name: 'عقار للخدمات العقارية',
        //     short_name: 'عقار',
        //     description: 'عقار للخدمات العقارية',
        //     theme_color: '#ffffff',
        //     icons: [
        //       {
        //           src: 'aqarLogo.png',
        //           sizes: '192x192',
        //           type: 'image/png'
        //       },
        //       {
        //           src: 'aqarLogo.png',
        //           sizes: '512x512',
        //           type: 'image/png'
        //       }
        //     ],
        //   },
        // }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
});
