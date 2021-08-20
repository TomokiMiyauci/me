import { logger } from 'firebase-functions'

import { createFunctions, switchable } from '@/util'
import type { QueryDocumentSnapshot } from '@google-cloud/firestore'
import type { MetaLocales } from '@/meta/locales/types'
import admin from 'firebase-admin'
import { includes } from 'core-fn'
import type { Locale } from '@/../../config/types'

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

const onCreate = {
  pushFCM
}

export { onCreate, pushFCM }
export type { Params }
