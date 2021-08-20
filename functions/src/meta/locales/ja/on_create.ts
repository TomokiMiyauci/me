import { logger } from 'firebase-functions'

import { createFunctions, switchable } from '@/util'
import type { QueryDocumentSnapshot } from '@google-cloud/firestore'
import type { MetaLocales } from '@/meta/locales/types'
import admin from 'firebase-admin'

const onCreate = createFunctions()
  .firestore.document('meta/{slug}/locales/ja')
  .onCreate(
    async (
      snapShot: QueryDocumentSnapshot<Partial<MetaLocales>>
    ): Promise<boolean> => {
      const { title, description, thumbnailUrl, url } = snapShot.data()

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
          locale: 'ja'
        }
      }

      const fn = switchable(
        async () =>
          admin
            .messaging()
            .sendToCondition("'article' in topics && 'ja' in topics", content)
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

export { onCreate }
