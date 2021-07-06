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
        authorization: `token 55c363212c1e70dbaabfef6005f3203422762cb4`
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
