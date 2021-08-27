import escapeStringRegexp from 'escape-string-regexp'

const pagePath = 'posts'
const indexName = 'Pages'

const query = `{
  pages: allMdx(
    filter: {
      fileAbsolutePath: { regex: "/posts/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const pageToAlgoliaRecord = ({ node: { id, frontmatter, ...rest } }) => {
  return {
    objectID: id,
    ...frontmatter,
    ...rest
  }
}

const queries = [
  {
    query,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] }
  }
]

export { queries }
