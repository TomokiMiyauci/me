import '@/assets/styles/index.scss'

import NProgress from 'nprogress'
import routes from 'vite-plugin-pages/client'
import { ViteSSG } from 'vite-ssg'

import App from '@/App.vue'
import GlobalRegister from '@/plugins/global-register'

export const createApp = ViteSSG(
  App,
  { routes },
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
