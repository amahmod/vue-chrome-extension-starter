import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { crx } from '@crxjs/vite-plugin'

//@ts-ignore
import manifest from './src/manifest'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), crx({ manifest })],
    server: {
        hmr: {
            host: 'localhost',
            port: 3000,
            protocol: 'ws',
        },
    },
})
