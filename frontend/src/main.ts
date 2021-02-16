import '@/assets/styles/index.scss'
import 'windi.css'

import NProgress from 'nprogress'
import routes from 'vite-plugin-pages/client'
import { ViteSSG } from 'vite-ssg'
import { RouterScrollBehavior } from 'vue-router'

import App from '@/App.vue'
import GlobalRegister from '@/plugins/global-register'
import i18n, { DEFAULT_LOCALE } from '@/plugins/i18n'
const scrollBehavior: RouterScrollBehavior = (_, __, savedPosition) => {
  if (savedPosition) return savedPosition
  else return { top: 0 }
}

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ isClient, router, app }) => {
    app.use(GlobalRegister).use(i18n)

    if (isClient) {
      router.beforeEach(() => {
        NProgress.start()
      })

      router.afterEach(() => {
        console.log(i18n.global.locale.value)
        const fallbackLocales = i18n.global.availableLocales.filter(
          (locale) => locale !== DEFAULT_LOCALE
        )

        if (router.currentRoute.value.path.startsWith('/ja/')) {
          if (i18n.global.locale.value !== 'ja') {
            i18n.global.locale.value = 'ja'
          }
        } else if (i18n.global.locale.value !== 'en') {
          i18n.global.locale.value = 'en'
        }

        NProgress.done()
      })
    }
  }
)
