import React from 'react'

import './assets/global.scss'
import './assets/prose.scss'

import { GatsbySSR } from 'gatsby'
import Context from './src/contexts'

const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return <Context>{element}</Context>
}

export { wrapRootElement }
