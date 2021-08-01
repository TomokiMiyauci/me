import functions from 'firebase-functions'
import type { Locale } from '../../config/types'
import { renderFile, configure } from 'eta'
import Twitter from 'twitter-api-v2'
import type { Config } from './types'

export { line } from './line'

import admin from 'firebase-admin'

admin.initializeApp()

const {
  app_key: appKey,
  app_secret: appSecret,
  access_token: accessToken,
  access_secret: accessSecret
} = (functions.config() as Config).twitter
const client = new Twitter({
  appKey,
  appSecret,
  accessToken,
  accessSecret
})
configure({
  views: 'views'
})

type Post = {
  url: string
  title: string
  description: string
  locale: Locale
}

type Params = {
  locale: Locale
  slug: string
}

export const onCreateMetaPost = functions
  .region('asia-northeast1')
  .runWith({
    memory: '128MB'
  })
  .firestore.document('meta/{slug}/locales/{locale}')
  .onCreate(async (snapshot, { params }) => {
    const { locale } = params as Params
    const { url } = snapshot.data() as Partial<Post>

    if (!url) {
      functions.logger.error('Something data is undefined')
      return
    }
    const content = await renderFile(templateName(locale), {
      url
    })

    if (!content) return

    return client.v1.tweet(content).catch((e) => {
      functions.logger.error(e)
    })
  })

const templateName = (locale: Locale): string => {
  const fileName = locale === 'en' ? 'tweet' : 'tweet_ja'

  return `./${fileName}`
}
