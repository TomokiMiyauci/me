import React from 'react'
import ReactDOM from 'react-dom'

import '@/assets/global.scss'
import '@/assets/prose.scss'
import type { GatsbyBrowser } from 'gatsby'
import Context from '@/contexts'
import type { Locale } from 'axe-core'

import loadable from '@loadable/component'
const Layout = loadable(() => import('@/components/Layout'))
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

const onInitialClientRender: GatsbyBrowser['onInitialClientRender'] =
  async () => {
    if (process.env.NODE_ENV !== 'production') {
      const { default: axe } = await import('@axe-core/react')
      const { default: ja } = await import('axe-core/locales/ja.json')
      await axe(React, ReactDOM, 1000, {
        locale: ja as unknown as Locale
      })
    }
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
export { wrapRootElement, wrapPageElement, onInitialClientRender }
