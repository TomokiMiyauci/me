import '@/assets/global.scss'
import '@/assets/prose.scss'
import type { GatsbyBrowser } from 'gatsby'
import Context from '@/contexts'
import Layout from '@/layout'

import type { PageContext } from 'config/types'

const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return <Context>{element}</Context>
}

const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('register service worker')
    window.navigator.serviceWorker.register('/append_script.js')
  }
}

const wrapPageElement: GatsbyBrowser<
  Record<string, unknown>,
  PageContext
>['wrapPageElement'] = ({ props, element }) => {
  return <Layout {...props}>{element}</Layout>
}
export { wrapRootElement, wrapPageElement, onClientEntry }
