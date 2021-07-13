import { GatsbySSR } from 'gatsby'
import React from 'react'

import Layout from '../src/components/Firebase'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return <Layout>{element}</Layout>
}
