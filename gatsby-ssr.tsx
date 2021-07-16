import React from 'react'

import { GatsbySSR } from 'gatsby'
import Context from './src/contexts'

const wrapRootElement: GatsbySSR['wrapRootElement'] = ({
  element,
  ...props
}) => {
  return <Context>{element}</Context>
}

export { wrapRootElement }
