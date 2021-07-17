import { resolve } from 'path'
import { GatsbyNode } from 'gatsby'
import { execSync } from 'child_process'
import moment from 'moment'
import { toLowerCase } from 'core-fn'

const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter
}) => {
  const { createPage } = actions
  const blogPost = resolve(`./src/templates/BlogPost.tsx`)
  const result = await graphql(`
    {
      blog: allMdx(
        filter: { fields: { locale: { eq: "ja" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          frontmatter {
            slug
          }
          id
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.blog.nodes

  posts.forEach(({ frontmatter }, index) => {
    const previousPostSlug =
      index === 0 ? null : posts[index - 1].frontmatter.slug
    const nextPostSlug =
      index === posts.length - 1 ? null : posts[index + 1].frontmatter.slug

    createPage({
      path: frontmatter.slug,
      component: blogPost,
      context: {
        previousPostSlug,
        nextPostSlug,
        slug: frontmatter.slug
      }
    })
  })
}

const onCreateNode: GatsbyNode<{
  fileAbsolutePath: string
  frontmatter: { date?: string; tags?: string[] }
}>['onCreateNode'] = ({ node, actions }) => {
  if (node.internal.type === 'Mdx') {
    const { date, tags } = node.frontmatter!
    if (!date) {
      console.error('Not exists date property in frontmatter')
    }

    const gitAuthorTime = execSync(
      `git log -1 --pretty=format:%aI ${node.fileAbsolutePath}`
    ).toString()

    const isModified = !moment(gitAuthorTime).isSame(date, 'day')
    actions.createNodeField({
      node,
      name: 'gitAuthorTime',
      value: gitAuthorTime
    })

    actions.createNodeField({
      node,
      name: 'isModified',
      value: isModified
    })

    actions.createNodeField({
      node,
      name: 'lowerCaseTags',
      value: tags?.map(toLowerCase) ?? []
    })
  }
}

export { createPages, onCreateNode }
