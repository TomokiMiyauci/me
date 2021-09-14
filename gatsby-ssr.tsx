import Context from '@/contexts'
import { isProd } from '@/utils/environment'
import Layout from '@/layout'

import type { GatsbySSR } from 'gatsby'
import type { PageContext } from 'config/types'

const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return <Context>{element}</Context>
}

const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
  if (!isProd) {
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

const wrapPageElement: GatsbySSR<
  Record<string, unknown>,
  PageContext
>['wrapPageElement'] = ({ props, element }) => {
  return <Layout {...props}>{element}</Layout>
}
export { wrapRootElement, wrapPageElement, onRenderBody }
