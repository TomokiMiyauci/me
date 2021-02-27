import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import { readFileSync, statSync } from 'fs'
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import namedCodeBlocks from 'markdown-it-named-code-blocks'
import Prism from 'markdown-it-prism'
import { resolve } from 'path'
import { readingTime as readtime } from 'reading-time-estimator'
import { defineConfig } from 'vite'
import Components from 'vite-plugin-components'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa'
import WindiCSS from 'vite-plugin-windicss'
import svgLoader from 'vite-svg-loader'

import { getStats } from './src/functions/markdown/next-prev'
import { getToc } from './src/functions/markdown/toc'
import { verdictLocale } from './src/functions/resolver'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const emoji = require('markdown-it-emoji')
const config = defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    svgLoader(),
    ...WindiCSS({
      safelist: 'prose prose-sm m-auto hidden xl:block sticky top-10 w-60'
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
        const { meta, component, path: p } = route
        const locale = verdictLocale(p)
        const fileStats = getStats(locale)

        const index = fileStats.findIndex(
          (file) => file.component === component
        )
        const nextFullPath = fileStats[index + 1]?.fullpath
        const prevFullPath = fileStats[index - 1]?.fullpath

        const next = nextFullPath
          ? {
              ...matter(readFileSync(nextFullPath, 'utf-8')).data,
              path: fileStats[index + 1]?.path
            }
          : undefined

        const prev = prevFullPath
          ? {
              ...matter(readFileSync(prevFullPath, 'utf-8')).data,
              path: fileStats[index - 1]?.path
            }
          : undefined
        const path = resolve(__dirname, component.slice(1))
        const md = readFileSync(path, 'utf-8')
        const toc = getToc(md)

        const { data, content } = matter(md)
        const frontmatter = {
          ...data,
          toc,
          next,
          prev,
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
      wrapperClasses: 'prose m-auto dark:prose-dark min',
      headEnabled: true,
      markdownItSetup: (md) => {
        md.use(Prism)
        md.use(namedCodeBlocks, { isEnableInlineCss: true })
        md.use(emoji)

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
