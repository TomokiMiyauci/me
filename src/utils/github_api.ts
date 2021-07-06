const getCommentNumber = async (path: string) => {
  const { graphql } = await import('@octokit/graphql')

  const { search } = (await graphql(
    `
      query ($q: String!) {
        search(query: $q, type: ISSUE, first: 1) {
          nodes {
            ... on Issue {
              comments {
                totalCount
              }
              number
              title
            }
          }
        }
      }
    `,
    {
      q: `repo:TomokiMiyauci/me in:title ${path}`,
      headers: {
        authorization: `token ${process.env.GATSBY_GITHUB_API}`
      }
    }
  )) as ResultSearch

  type ResultSearch = {
    search: {
      nodes: {
        comments: {
          totalCount: number
        }
      }[]
    }
  }

  return search.nodes[0]?.comments.totalCount ?? 0
}

export { getCommentNumber }
