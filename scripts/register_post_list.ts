import { outputJSON, readJson } from 'fs-extra'
import { resolve } from 'path'
import admin from 'firebase-admin'
import { BuildArgs } from 'gatsby'
import type { Locale } from '@/../config/types'
import { isUndefined } from '@miyauci/is-valid'
import { replace, test } from 'core-fn'
import type { Mdx, MdxFrontmatter } from '@/../graphql-types'
import { config } from 'dotenv'

const pretty = replace(/\\n/g, '\n')
const isPosts = test(/\/posts\//)
const postJson = resolve(__dirname, '..', 'tmp', 'posts.json')

const writePostList = async (
  to: string,
  content: Record<PropertyKey, unknown>
): Promise<void> => {
  return outputJSON(to, content, {})
}

const readPostList = async (from: string): Promise<PostMeta[]> => {
  const { posts } = await readJson(from)
    .then((r) => r as { posts: PostMeta[] })
    .catch(() => {
      console.error('Not found posts.json')
      return { posts: [] as PostMeta[] }
    })

  return posts
}

const postPostList = async (posts: PostMeta[]): Promise<void> => {
  config()
  const clientEmail = process.env.CLIENT_EMAIL
  const privateKey = process.env.PRIVATE_KEY
  if (isUndefined(clientEmail) || isUndefined(privateKey)) {
    console.error('No credential')
    return
  }

  console.log('posts:', posts.length)

  initializeApp(clientEmail, pretty(privateKey))

  await Promise.all(
    posts.map(({ locale, url, title, description, slug }) => {
      if (!url || !description) return

      postMeta({ slug, locale }, { url, title, description })
    })
  )
}

const initializeApp = (clientEmail: string, privateKey: string) =>
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail,
      privateKey,
      projectId: 'blorogue'
    })
  })

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
    .create({
      ...content,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    })
    .catch(() => {})
}

type PostMeta = {
  url?: string
  slug: string
  locale: Locale
} & Pick<MdxFrontmatter, 'title' | 'description'>

const useMetaPoster = async ({
  reporter,
  getNodesByType
}: BuildArgs): Promise<void> => {
  if (process.env.STAGE !== 'main') return
  const allMdx = getNodesByType('Mdx') as unknown as Mdx[]

  const postMdxs: PostMeta[] = allMdx
    .filter((node) => isPosts(node.fileAbsolutePath))
    .map(({ fields, frontmatter }) => ({
      title: frontmatter?.title as string,
      description: frontmatter?.description as string | undefined,
      slug: fields?.dirName,
      url: fields?.fullPath as string | undefined,
      locale: fields?.locale as Locale
    }))

  await writePostList(postJson, {
    posts: postMdxs
  })

  reporter.success('Output post meta info')
}

const main = async () => {
  const posts = await readPostList(postJson)

  await postPostList(posts)
}

if (require.main === module) {
  main()
  console.info('Post meta info')
}

export { useMetaPoster, main, isPosts }
