import React from 'react'

import '@/assets/global.scss'
import '@/assets/prose.scss'
import type { GatsbyBrowser } from 'gatsby'
import Context from '@/contexts'
import Layout from '@/components/Layout'

const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return <Context>{element}</Context>
}

const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('register service worker')
    window.navigator.serviceWorker.register('/append_script.js')
  }
}

type PageContext = {
  previousPostSlug: string
  nextPostSlug: string
  slug: string
  locale: 'en' | 'ja'
  hrefLang: 'en-US' | 'jp-JA'
  originalPath: string
  dateFormat: string
}

const wrapPageElement: GatsbyBrowser<
  Record<string, unknown>,
  PageContext
>['wrapPageElement'] = ({ props, element }) => {
  return (
    <Layout
      originalPath={props.pageContext.originalPath}
      currentPath={props.location.pathname}
      locale={props.pageContext.locale}
    >
      {element}
    </Layout>
  )
}
export { wrapRootElement, wrapPageElement, onClientEntry }
