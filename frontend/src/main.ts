import '@/assets/styles/index.scss'
import 'windi.css'

import NProgress from 'nprogress'
import routes from 'pages-generated'
import { ViteSSG } from 'vite-ssg'
import { RouterScrollBehavior } from 'vue-router'

import App from '@/App.vue'
import clarity from '@/plugins/clarity'
import GlobalRegister from '@/plugins/global-register'
import i18n from '@/plugins/i18n'
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
      app.use(clarity)
      router.beforeEach(() => {
        NProgress.start()
      })

      router.afterEach(() => {
        if (router.currentRoute.value.path.startsWith('/ja')) {
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
