import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import {VitePWA, VitePWAOptions} from 'vite-plugin-pwa';
import manifest from './manifest.json'

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType:"prompt",
  includeAssets: ['favicon.ico', 'apple-touch-icon', 'masked-icon-svg'],
  manifest
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
