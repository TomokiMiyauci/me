import { resolve, join } from 'path'
import { GatsbyNode, BuildArgs } from 'gatsby'
import { execSync } from 'child_process'
import moment from 'moment'
import { toLowerCase } from 'core-fn'
import type { SiteMetaData, Locale } from './config/types'
import admin from 'firebase-admin'
import { isUndefined } from '@miyauci/is-valid'
import { exec, replace } from 'core-fn'

const parseSlug = exec(/^\/posts\/(?<slug>.*)\//)
const pretty = replace(/\\n/g, '\n')
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
  frontmatter: { date?: string; tags?: string[]; slug: string }
  fields: { locale: Locale }
}>['onCreateNode'] = ({ node, actions, getNode }) => {
  const site = getNode('Site')
  const { siteUrl } = site.siteMetadata as SiteMetaData

  if (node.internal.type === 'Mdx') {
    const { date, tags, slug } = node.frontmatter!
    const { locale } = node.fields

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

    const fullPath = makeFullPath(
      {
        base: siteUrl,
        path: slug
      },
      locale
    )

    actions.createNodeField({
      node,
      name: 'fullPath',
      value: fullPath
    })
  }
}

const onPostBuild: GatsbyNode['onPostBuild'] = (buildArgs) => {
  if (process.env.STAGE === 'main') {
    useMetaPoster(buildArgs)
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

const postMeta = (
  {
    slug,
    locale
  }: {
    slug: string
    locale: Locale
  },
  content: {
    url: string
    title: string
    description: string
  }
) => {
  return admin
    .firestore()
    .collection('meta')
    .doc(slug)
    .collection('locales')
    .doc(locale)
    .set({
      ...content,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
}

const initializeApp = (clientEmail: string, privateKey: string) => {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail,
      privateKey,
      projectId: 'blorogue'
    })
  })
}

const useMetaPoster = ({ reporter, getNodesByType, getNode }: BuildArgs) => {
  const clientEmail = process.env.CLIENT_EMAIL
  const privateKey = process.env.PRIVATE_KEY
  if (isUndefined(clientEmail) || isUndefined(privateKey)) {
    reporter.error('No credential')
    return
  }

  initializeApp(clientEmail, pretty(privateKey))

  const site = getNode('Site')

  const { siteUrl } = site.siteMetadata as SiteMetaData

  const mdxs = getNodesByType('Mdx')

  mdxs.forEach(({ fields, frontmatter }) => {
    const { locale } = fields as { locale: Locale }

    const { title, description, slug } = frontmatter as {
      title: string
      description: string
      slug: string
    }
    const { slug: _slug } = parseSlug(slug)?.groups ?? { slug: '' }

    if (!_slug) return

    const fullPath = makeFullPath(
      {
        base: siteUrl,
        path: slug
      },
      locale
    )

    const url = new URL(fullPath, siteUrl).toString()

    postMeta({ slug: _slug, locale }, { url, title, description })
  })

  reporter.success('post meta info is updated')
}

export { createPages, onCreateNode, onPostBuild }
