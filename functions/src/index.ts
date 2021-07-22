import functions from 'firebase-functions'
import type { Locale } from '../../config/types'
import { renderFile, configure } from 'eta'
import Twitter from 'twitter'

const twitterConfig = (functions.config() as Config).twitter
const client = new Twitter(twitterConfig)
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

type Config = {
  twitter: {
    consumer_key: string
    consumer_secret: string
    access_token_key: string
    access_token_secret: string
  }
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
    client.post(
      'statuses/update',
      {
        status: content
      },
      (error) => {
        if (error) {
          functions.logger.error(error)
        }
      }
    )
  })

const templateName = (locale: Locale): string => {
  const fileName = locale === 'en' ? 'tweet' : 'tweet_ja'

  return `./${fileName}`
}
