import '@/assets/styles/index.scss'

import routes from 'vite-plugin-pages/client'
import { ViteSSG } from 'vite-ssg'

import App from '@/App.vue'

export const createApp = ViteSSG(App, { routes }, () => {
  // install all modules under `modules/`
  // Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
  //   i.install?.(ctx)
  // )
})
