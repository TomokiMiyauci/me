import React, { FC } from 'react'
import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react'
import { MdxLink } from 'gatsby-theme-i18n'
import Alert from '../Alert'
import CodeGroup from '../CodeGroup'
import CodeBlock from '../CodeBlock'
import CodeGroups from '../CodeGroups'
import MdxH2 from '../MdxH2'

const components: MDXProviderComponentsProp = {
  pre: (props) => <div {...props} />,
  a: MdxLink,
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

const CustomMdxProvider: FC = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)

export default CustomMdxProvider
