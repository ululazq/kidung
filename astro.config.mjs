import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'static',
  site: 'https://kidung-9ontjewpe-plain1.vercel.app',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
})
