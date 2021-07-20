import React from 'react'

import '@/assets/global.scss'
import '@/assets/prose.scss'
import Layout from '@/components/Layout'
import type { GatsbyBrowser } from 'gatsby'
import Context from './src/contexts'

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
>['wrapPageElement'] = ({ element, props: { pageContext, location } }) => {
  return (
    <Layout
      originalPath={pageContext.originalPath}
      currentPath={location.pathname}
    >
      {element}
    </Layout>
  )
}

export { wrapRootElement, wrapPageElement }
