import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import Prism from 'markdown-it-prism'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Components from 'vite-plugin-components'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages'

const config = defineConfig({
  alias: {
    '@': resolve(__dirname, 'src')
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Components({
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: ''
      })
    }),
    Pages({
      extensions: ['vue', 'md'],
      importMode(path) {
        return path === '/' ? 'sync' : 'async'
      }
    }),
    vueI18n({
      include: resolve(__dirname, '@/locales/**')
    }),
    Markdown({
      wrapperClasses: 'prose prose-sm m-auto',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Prism)
      }
    }),
    ViteIcons()
  ]
})

export default config
