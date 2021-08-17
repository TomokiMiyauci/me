import { logger } from 'firebase-functions'

import { createFunctions } from '@/util'
import type { QueryDocumentSnapshot } from '@google-cloud/firestore'
import type { MetaLocales } from '@/meta/locales/types'
import admin from 'firebase-admin'

const onCreate = createFunctions()
  .firestore.document('meta/{slug}/locales/ja')
  .onCreate(async (snapShot: QueryDocumentSnapshot<Partial<MetaLocales>>) => {
    const { title, url } = snapShot.data()

    if (!title || !url) {
      logger.error('title or url is not exists.')
      return
    }

    const content: admin.messaging.MessagingPayload = {
      notification: {
        title: '新しい記事を投稿しました🚀',
        body: title
      },
      data: {
        url
      }
    }

    await admin
      .messaging()
      .sendToCondition("'article' in topics && 'ja' in topics", content)

    logger.log('Success sendToTopic', {
      content
    })
  })

export { onCreate }
