import '@/assets/global.scss'
import '@/assets/prose.scss'
import type { GatsbyBrowser } from 'gatsby'
import Context from '@/contexts'
import Layout from '@/layouts'

import type { PageContext } from 'config/types'

const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return <Context>{element}</Context>
}

const onClientEntry: GatsbyBrowser['onClientEntry'] = async () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('register service worker')
    window.navigator.serviceWorker.register('/append_script.js')
  }

  const { setAccentColor } = await import('@/utils/accent_color')

  setAccentColor()
}

const wrapPageElement: GatsbyBrowser<
  Record<string, unknown>,
  PageContext
>['wrapPageElement'] = ({ props, element }) => {
  return <Layout {...props}>{element}</Layout>
}
export { wrapRootElement, wrapPageElement, onClientEntry }
