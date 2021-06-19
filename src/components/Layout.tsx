import React, { FC, ReactChildren } from 'react'
import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react'
import { MdxLink } from 'gatsby-theme-i18n'
import Alert from './Alert'
import CodeGroup from './CodeGroup'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import CodeBlock from './CodeBlock'
import CodeGroups from './CodeGroups'

const components: MDXProviderComponentsProp = {
  pre: props => <div {...props} />,
  a: MdxLink,
  code: CodeBlock,
  Alert,
  CodeGroups,
  CodeGroup
}

const Layout: FC<{ children: ReactChildren; originalPath: string }> = ({
  children,
  originalPath
}) => {
  return (
    <>
      <TheHeader originalPath={originalPath} />
      <main className="p-4">
        <MDXProvider components={components}>{children}</MDXProvider>
      </main>

      <TheFooter />
    </>
  )
}

export default Layout
