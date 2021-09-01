import { FC } from 'react'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const PlainText: FC<PageProps> = ({ data }) => {
  return (
    <div className="prose max-w-5xl mx-auto">
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </div>
  )
}

export default PlainText

export const query = graphql`
  query MediaBySlug($locale: String!, $slug: String!) {
    mdx(
      fileAbsolutePath: { regex: "//media//" }
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      body
    }
  }
`
