import React from 'react'

import type { GatsbySSR } from 'gatsby'
import Context from '@/contexts'
import Layout from '@/components/Layout'

const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return <Context>{element}</Context>
}

const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  setHeadComponents([
    <script
      key="google-adsense"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3149742411805247"
      crossOrigin="anonymous"
    />,
    <script key="google-ads">
      (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  ])
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
export { wrapRootElement, wrapPageElement, onRenderBody }
