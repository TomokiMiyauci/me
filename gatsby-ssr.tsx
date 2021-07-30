import React from 'react'

import type { GatsbySSR } from 'gatsby'
import Context from '@/contexts'
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
