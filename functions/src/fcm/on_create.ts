import { logger } from 'firebase-functions'
import { createFunctions } from '@/util'
import type { QueryDocumentSnapshot } from '@google-cloud/firestore'
import type { FCM } from '@/fcm/types'
import admin from 'firebase-admin'

const onCreate = createFunctions()
  .firestore.document('fcm/{token}')
  .onCreate(async (snapshot: QueryDocumentSnapshot<Partial<FCM>>) => {
    const { token, topics } = snapshot.data()

    if (!token || !topics) {
      logger.error('token is not exists.')
      return
    }

    return Promise.all(
      topics.map(async (topic) => {
        await admin
          .messaging()
          .subscribeToTopic(token, topic)
          .then(() => {
            logger.info('Success token subscribeToTopic', {
              token,
              topic
            })
          })
          .catch((e) =>
            logger.error(e, {
              token,
              topic
            })
          )
      })
    ).then(() => {
      logger.info('Success all topics subscription', {
        token,
        topics
      })
    })
  })

export { onCreate }
