import { resolve, join } from 'path'
import { GatsbyNode } from 'gatsby'
import { execSync } from 'child_process'
import moment from 'moment'
import { toLowerCase } from 'core-fn'
import type { SiteMetaData, Locale } from './config/types'
import { exec } from 'core-fn'
import { setupAccessCount } from './scripts/access_counter'
import { props } from 'fonction'
import { Mdx } from '@/../graphql-types'
import { useMetaPoster, isPosts } from './scripts/register_post_list'
import { RelativeCiAgentWebpackPlugin } from '@relative-ci/agent'
import WorkerPlugin from 'worker-plugin'

const { getAccessCount } = setupAccessCount()

const parseSlug = exec(/^\/posts\/(?<slug>.*)\//)

const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter
}) => {
  const { createPage } = actions
  const blogPost = resolve('./src/templates/BlogPost.tsx')
  const result = await graphql(`
    {
      blog: allMdx(
        filter: {
          fields: { locale: { eq: "ja" } }
          fileAbsolutePath: { regex: "//posts//" }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          fields {
            lowerCaseTags
          }
          frontmatter {
            slug
          }
          id
        }
      }
      media: allMdx(filter: { fileAbsolutePath: { regex: "//media//" } }) {
        nodes {
          frontmatter {
            slug
          }
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
  const media = result.data.media.nodes

  const plainText = resolve('./src/templates/PlainText.tsx')

  posts.forEach(({ frontmatter, fields }, index) => {
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
        slug: frontmatter.slug,
        tags: fields.lowerCaseTags
      }
    })
  })

  media.forEach(({ frontmatter: { slug } }) => {
    createPage({
      path: slug,
      component: plainText,
      context: {
        slug
      }
    })
  })
}

const onCreateNode: GatsbyNode<Mdx>['onCreateNode'] = async ({
  node,
  actions,
  getNode
}) => {
  const site = getNode('Site')
  const { siteUrl } = site.siteMetadata as SiteMetaData

  if (node.internal.type === 'Mdx' && isPosts(node.fileAbsolutePath)) {
    const slugViewMap = await getAccessCount()
    const { date, tags, slug } = node.frontmatter!
    const { locale } = node.fields!

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

    actions.createNodeField({
      node,
      name: 'dateByMMM',
      value: moment(date).format('MMM')
    })

    const fullPath = makeFullPath(
      {
        base: siteUrl,
        path: slug!
      },
      locale as Locale
    )

    const { slug: _slug } = parseSlug(slug!)?.groups ?? { slug: '' }

    if (_slug) {
      actions.createNodeField({ node, name: 'dirName', value: _slug })
    }

    actions.createNodeField({
      node,
      name: 'fullPath',
      value: fullPath
    })

    const view = props(slug!, slugViewMap)

    actions.createNodeField({
      node,
      name: 'view',
      value: view ?? 0
    })
  }
}

const onPostBuild: GatsbyNode['onPostBuild'] = async (buildArgs) => {
  await useMetaPoster(buildArgs)
}

const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  getConfig,
  actions
}) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [new RelativeCiAgentWebpackPlugin()]
    })

    actions.setWebpackConfig({
      plugins: [
        new WorkerPlugin({
          preserveTypeModule: true
        })
      ]
    })
  }

  // for axe ignore warning
  if (process.env.NODE_ENV !== 'production') {
    const config = getConfig()

    config.resolve.fallback = {
      crypto: false
    }
    actions.replaceWebpackConfig(config)
  }
}

const makeFullPath = (
  {
    base,
    path
  }: {
    base: string
    path: string
  },
  locale: Locale
): string => {
  const _path = locale === 'en' ? path : join(locale, path)
  return new URL(_path, base).toString()
}

export { createPages, onCreateNode, onPostBuild, onCreateWebpackConfig }
