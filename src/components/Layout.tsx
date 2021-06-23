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
import BottomNavigation from './BottomNavigation'

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
  const [isShowHeader, changeShow] = useState(true)
  const fn = scrollInfoEvent((_, { type, diff }) => {
    if (diff > 14 && type === 'up') {
      changeShow(true)
    } else if (diff > 14 && type === 'down') {
      changeShow(false)
    }
  })

  useEffect(() => {
    addEventListener('scroll', fn)

    return () => removeEventListener('scroll', fn)
  })
  return (
    <>
      <main className="p-4 mt-14 md:mt-28">
        <MDXProvider components={components}>{children}</MDXProvider>
      </main>

      <TheHeader
        originalPath={originalPath}
        className={`transform md:transform-none md:translate-y-0 transition-transform duration-300 delay-500 ${
          isShowHeader ? '' : '-translate-y-full'
        }`}
      />

      <TheFooter />

      <BottomNavigation
        originalPath={originalPath}
        className={`transform md:hidden md:transform-none md:translate-y-0 transition-transform duration-300 delay-100 ${
          isShowHeader ? '' : 'translate-y-full'
        }`}
      />
    </>
  )
}

export default Layout
