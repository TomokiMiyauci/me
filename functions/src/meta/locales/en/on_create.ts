import { logger } from 'firebase-functions'

import { createFunctions } from '@/util'
import type { QueryDocumentSnapshot } from '@google-cloud/firestore'
import type { MetaLocales } from '@/meta/locales/types'
import admin from 'firebase-admin'

const onCreate = createFunctions()
  .firestore.document('meta/{slug}/locales/en')
  .onCreate(async (snapShot: QueryDocumentSnapshot<Partial<MetaLocales>>) => {
    const { title, description, thumbnailUrl, url } = snapShot.data()

    if (!title || !description || !url) {
      logger.error('title or description or url is not exists')
      return
    }

    const content: admin.messaging.MessagingPayload = {
      notification: {
        title,
        body: description,
        image: thumbnailUrl ?? ''
      },

      data: {
        url,
        locale: 'en'
      }
    }

    await admin
      .messaging()
      .sendToCondition("'article' in topics && 'en' in topics", content)

    logger.log('Success sendToTopic', {
      content
    })
  })

export { onCreate }
