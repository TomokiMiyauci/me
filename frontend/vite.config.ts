import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import { readFileSync, statSync } from 'fs'
import matter from 'gray-matter'
import Prism from 'markdown-it-prism'
import { resolve } from 'path'
import { readingTime as readtime } from 'reading-time-estimator'
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
      },
      extendRoute(route) {
        const { meta, component } = route
        const path = resolve(__dirname, component.slice(1))
        const md = readFileSync(path, 'utf-8')

        const { data, content } = matter(md)
        const frontmatter = {
          ...data,
          readingTime: readtime(content, 200),
          updatedAt: statSync(path).ctime
        }
        route.meta = Object.assign(meta || {}, { frontmatter })

        return route
      }
    }),
    vueI18n({
      include: resolve(__dirname, '@/locales/**')
    }),
    Markdown({
      wrapperComponent: 'post',
      wrapperClasses: 'prose m-auto',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Prism)
      }
    }),
    ViteIcons()
  ]
})

export default config
