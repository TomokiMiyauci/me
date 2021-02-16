import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import { readFileSync, statSync } from 'fs'
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import namedCodeBlocks from 'markdown-it-named-code-blocks'
import Prism from 'markdown-it-prism'
import tableOfContents from 'markdown-it-table-of-contents'
import { resolve } from 'path'
import { readingTime as readtime } from 'reading-time-estimator'
import { defineConfig } from 'vite'
import Components from 'vite-plugin-components'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'
import WindiCSS from 'vite-plugin-windicss'

import { getToc } from './src/functions/markdown/toc'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const emoji = require('markdown-it-emoji')
const config = defineConfig({
  alias: {
    '@': resolve(__dirname, 'src')
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    ...WindiCSS({
      safelist: 'prose prose-sm m-auto'
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
        const toc = getToc(md)

        const { data, content } = matter(md)
        const frontmatter = {
          ...data,
          toc,
          readingTime: readtime(content, 200),
          updatedAt: statSync(path).ctime
        }
        route.meta = Object.assign(meta || {}, { frontmatter })
        if (route.name === '404') {
          route.path = '/:pathMatch(.*)*'
        }

        return route
      }
    }),
    vueI18n({
      include: resolve(__dirname, './src/locales/**')
    }),
    Markdown({
      wrapperComponent: 'markdown-resolver',
      wrapperClasses: 'prose m-auto',
      headEnabled: true,
      markdownItSetup: (md) => {
        md.use(Prism)
        md.use(namedCodeBlocks, { isEnableInlineCss: true })
        md.use(emoji)
        md.use(tableOfContents, {
          includeLevel: [2, 3],
          containerHeaderHtml: '<div class="p-2">目次</div>'
        })
        md.use(anchor, {
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '#',
          permalinkAttrs: () => ({ 'aria-hidden': true })
        })
      }
    }),
    ViteIcons(),
    VitePWA()
  ]
})

export default config
