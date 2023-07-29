import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: "Chapa's Lanches",
        short_name: "Chapa's",
        id: "/",
        start_url: "/",
        display: "standalone",
        background_color: "#C65A05",
        description: "O melhor lanche de Álvares Machado agora está também na tela do seu celular! Vem pro Chapa's",
        theme_color: "#c65a05",
        lang: "portuguese",
        scope: "/",
        orientation: "portrait",
        serviceworker: "./sw.js",
        icons: [
          {
            src: "/icon32x32.png",
            sizes: "32x32",
            type: "image/png",
            maskable: true
          },
          {
            src: "/icon144x144.png",
            sizes: "144x144",
            type: "image/png",
            maskable: true
          },
          {
            src: "/icon152x152.png",
            sizes: "152x152",
            type: "image/png",
            maskable: true
          },
          {
            src: "/icon192x192.png",
            sizes: "192x192",
            type: "image/png",
            maskable: true
          },
          {
            src: "/icon512x512.png",
            sizes: "512x512",
            type: "image/png",
            maskable: true
          }
        ]
      },
    }),
  ],
});