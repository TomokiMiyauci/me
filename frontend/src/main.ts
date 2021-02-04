import '@/assets/styles/index.scss'

import NProgress from 'nprogress'
import routes from 'vite-plugin-pages/client'
import { ViteSSG } from 'vite-ssg'
import { RouterScrollBehavior } from 'vue-router'

import App from '@/App.vue'
import GlobalRegister from '@/plugins/global-register'

const scrollBehavior: RouterScrollBehavior = (_, __, savedPosition) => {
  if (savedPosition) return savedPosition
  else return { top: 0 }
}

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ isClient, router, app }) => {
    app.use(GlobalRegister)

    if (isClient) {
      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  }
)
