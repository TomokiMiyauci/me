import { resolve, join } from 'path'
import { GatsbyNode } from 'gatsby'
import { execSync } from 'child_process'
import moment from 'moment'
import { toLowerCase } from 'core-fn'
import type { SiteMetaData, Locale } from './config/types'
import { exec } from 'core-fn'
import { props } from 'fonction'
import { Mdx } from '@/../graphql-types'
import { useMetaPoster, isPosts } from './scripts/register_post_list'
import { RelativeCiAgentWebpackPlugin } from '@relative-ci/agent'
import WorkerPlugin from 'worker-plugin'
import { safeGetAccessNumbers } from './scripts/access_counter'
import { safeGetLike } from './scripts/like_counter'
import { CHATROOM_TYPES } from './config/constants'

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

  CHATROOM_TYPES.forEach((type) => {
    createPage({
      path: join('/chat/', type, '/'),
      component: resolve('./src/templates/ChatRoom.tsx'),
      context: {}
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
  getNode,
  reporter
}) => {
  const site = getNode('Site')
  const { siteUrl } = site.siteMetadata as SiteMetaData

  if (node.internal.type === 'Mdx' && isPosts(node.fileAbsolutePath)) {
    const slugViewMap = await safeGetAccessNumbers()
    const slugLikeMap = await safeGetLike()
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

    const fullPath = makeFullPath(slug!, locale as Locale)
    const url = new URL(fullPath, siteUrl).toString()

    const { slug: _slug } = parseSlug(slug!)?.groups ?? { slug: '' }

    if (_slug) {
      actions.createNodeField({ node, name: 'dirName', value: _slug })
    }

    actions.createNodeField({
      node,
      name: 'fullPath',
      value: url
    })

    const view = props(fullPath!, slugViewMap)
    const like = props(_slug, slugLikeMap)

    console.log(fullPath, view)

    actions.createNodeField({
      node,
      name: 'view',
      value: view ?? 0
    })

    actions.createNodeField({
      node,
      name: 'like',
      value: like ?? 0
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
  }
  actions.setWebpackConfig({
    plugins: [new WorkerPlugin()]
  })

  // // for axe ignore warning
  // if (process.env.NODE_ENV !== 'production') {
  //   const config = getConfig()

  //   config.resolve.fallback = {
  //     crypto: false
  //   }
  //   actions.replaceWebpackConfig(config)
  // }
}

const makeFullPath = (path: string, locale: Locale): string => {
  return locale === 'en' ? path : join('/', locale, path)
}

export { createPages, onCreateNode, onPostBuild, onCreateWebpackConfig }
