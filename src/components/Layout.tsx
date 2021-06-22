import React, { FC, ReactChildren, useEffect, useState } from 'react'
import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react'
import { MdxLink } from 'gatsby-theme-i18n'
import Alert from './Alert'
import CodeGroup from './CodeGroup'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import CodeBlock from './CodeBlock'
import CodeGroups from './CodeGroups'
import MdxLi from './MdxLi'

interface ScrollInfo {
  type: 'up' | 'down'
  diff: number
}

let lastPosition = 0
let ticking = false

const scrollInfoEvent =
  (fn: (ev: Event, scrollInfo: ScrollInfo) => unknown) => (ev: Event) => {
    const _lastPosition = lastPosition
    const currentScrollY = scrollY
    lastPosition = scrollY
    if (!ticking) {
      requestAnimationFrame(() => {
        const calc = currentScrollY - _lastPosition
        fn(ev, {
          type: calc > 0 ? 'down' : 'up',
          diff: Math.abs(calc)
        })
        ticking = false
      })

      ticking = true
    }
  }

const components: MDXProviderComponentsProp = {
  pre: (props) => <div {...props} />,
  a: MdxLink,
  li: MdxLi,
  code: CodeBlock,
  Alert,
  CodeGroups,
  CodeGroup
}

const Layout: FC<{ children: ReactChildren; originalPath: string }> = ({
  children,
  originalPath
}) => {
  const [isShowHeader, changeShow] = useState(false)
  const fn = scrollInfoEvent((_, { type, diff }) => {
    console.log(type)
    if (diff > 10 && type === 'up') {
      changeShow(true)
    } else if (diff > 10 && type === 'down') {
      changeShow(false)
    }
  })

  useEffect(() => {
    addEventListener('scroll', fn)

    return () => removeEventListener('scroll', fn)
  })
  return (
    <>
      <TheHeader
        originalPath={originalPath}
        className={`transform md:transform-none transition-transform duration-300 delay-100 md:delay-0 md:duration-[0] ${
          isShowHeader ? '' : 'translate-y-full'
        }`}
      />
      <main className="p-4">
        <MDXProvider components={components}>{children}</MDXProvider>
      </main>

      <TheFooter />
    </>
  )
}

export default Layout
