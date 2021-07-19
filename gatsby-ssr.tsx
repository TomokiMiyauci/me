import React from 'react'

import type { GatsbySSR } from 'gatsby'
import Context from './src/contexts'

const wrapRootElement: GatsbySSR['wrapRootElement'] = ({
  element,
  ...props
}) => {
  console.log(222)
  return <Context>{element}</Context>
}

export { wrapRootElement }
