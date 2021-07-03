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
import MdxH2 from './MdxH2'
import { scrollInfoEvent } from '../utils/scroll'

const components: MDXProviderComponentsProp = {
  pre: (props) => <div {...props} />,
  a: MdxLink,
  li: MdxLi,
  code: CodeBlock,
  h2: (props) => {
    const { id, children } = props
    const title = children[1]
    return <MdxH2 id={id} title={title} />
  },
  table: (props) => (
    <div className="w-full rounded-md overflow-x-scroll">
      <table {...props} />
    </div>
  ),
  Alert,
  CodeGroups,
  CodeGroup,

  wrapper: ({ children }) => {
    const updatedChildren = children.map((child) => {
      if (child.props.className === 'footnotes') {
        const { mdxType, originalType, ...rest } = child.props
        return <div key={1} {...rest} />
      }
      return child
    })
    return <>{updatedChildren}</>
  }
}

const Layout: FC<{ children: ReactChildren; originalPath: string }> = ({
  children,

  originalPath
}) => {
  const [isShowHeader, changeShow] = useState(true)
  const fn = scrollInfoEvent(({ direction, diff }) => {
    if (diff > 14 && direction === 'up') {
      changeShow(true)
    } else if (diff > 14 && direction === 'down') {
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
