import { logger, config } from 'firebase-functions'
import { createFunctions, switchable } from '@/util'
import type { QueryDocumentSnapshot } from '@google-cloud/firestore'
import type { MetaLocales } from '@/meta/locales/types'
import admin from 'firebase-admin'
import { includes } from 'core-fn'
import type { Locale } from '@/../../config/types'
import type { Post } from '@/types'
import type { Config } from '@/types'
import Twitter from 'twitter-api-v2'
import { renderTemplate, TemplateData, ellipsis } from '@/twitter/util'
import { templateName } from '@/twitter/util'

type Params = {
  slug: string
  locale: Locale
}

const pushFCM = createFunctions()
  .firestore.document('meta/{slug}/locales/{locale}')
  .onCreate(
    async (
      snapShot: QueryDocumentSnapshot<Partial<MetaLocales>>,
      { params }
    ): Promise<boolean> => {
      const { title, description, thumbnailUrl, url } = snapShot.data()
      const { locale } = params as Params

      if (!includes(locale, ['en', 'ja'])) {
        logger.error('Unknown locale is detected', {
          locale
        })

        return false
      }
      if (!title || !description || !url) {
        logger.error('title or description or url is not exists')

        return false
      }

      const content: admin.messaging.MessagingPayload = {
        notification: {
          title,
          body: description,
          image: thumbnailUrl ?? ''
        },

        data: {
          url,
          locale
        }
      }

      const condition = `'article' in topics && '${locale}' in topics`

      const fn = switchable(
        async () =>
          admin
            .messaging()
            .sendToCondition(condition, content)
            .then(() => {
              logger.log('Success sendToTopic', {
                content
              })
              return true
            }),
        async () => true
      )

      return fn()
    }
  )

const tweet = createFunctions()
  .firestore.document('meta/{slug}/locales/{locale}')
  .onCreate(async (snapshot, { params }) => {
    const { locale } = params as Params
    const { url, shortUrl, title, description } =
      snapshot.data() as Partial<Post>

    if (!url || !title || !description) {
      logger.error('Something data is undefined')
      return
    }

    const _url = shortUrl ?? url
    const template = templateName(locale)
    const content = await renderTemplate<TemplateData>(template, {
      url: _url,
      title,
      description
    })

    if (!content) return
    const ellipsisContent = ellipsis(content)

    const {
      app_key: appKey,
      app_secret: appSecret,
      access_token: accessToken,
      access_secret: accessSecret
    } = (config() as Config).twitter
    const client = new Twitter({
      appKey,
      appSecret,
      accessToken,
      accessSecret
    })

    return client.v1.tweet(ellipsisContent).catch((e) => {
      logger.error(e)
    })
  })

const onCreate = {
  pushFCM,
  tweet
}

export { onCreate, pushFCM }
export type { Params }
