import React from 'react'

import '@/assets/global.scss'
import '@/assets/prose.scss'
import type { GatsbyBrowser } from 'gatsby'

import loadable from '@loadable/component'
const Layout = loadable(() => import('@/components/Layout'))
const Context = loadable(() => import('@/contexts'))

const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return <Context>{element}</Context>
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
export { wrapRootElement, wrapPageElement }
