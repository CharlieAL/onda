import { nextui } from '@nextui-org/react'
import { VitePWA } from 'vite-plugin-pwa'
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#ff0080',
        azul: '#33FFE0'
      }
    }
  },
  plugins: [nextui(), VitePWA({ registerType: 'autoUpdate' })]
}
