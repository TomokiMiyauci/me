import React from 'react'

import type { GatsbySSR } from 'gatsby'
import Context from './src/contexts'
import Layout from '@/components/Layout'

const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
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

const wrapPageElement: GatsbySSR<
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
