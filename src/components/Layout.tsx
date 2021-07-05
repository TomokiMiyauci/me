import React, { FC, ReactChildren } from 'react'
import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react'
import { MdxLink } from 'gatsby-theme-i18n'
import Alert from './Alert'
import CodeGroup from './CodeGroup'
import CodeBlock from './CodeBlock'
import CodeGroups from './CodeGroups'
import MdxLi from './MdxLi'
import MdxH2 from './MdxH2'
import AppFrame from './AppFrame'

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

const Layout: FC<{
  children: ReactChildren
  originalPath: string
  currentPath: string
}> = ({ children, currentPath, originalPath }) => {
  return (
    <>
      <main className="p-4 mt-14 md:mt-28">
        <MDXProvider components={components}>{children}</MDXProvider>
      </main>

      <AppFrame currentPath={currentPath} originalPath={originalPath} />
    </>
  )
}

export default Layout
