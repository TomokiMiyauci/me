import { logger } from 'firebase-functions'
import { createFunctions } from '@/util'
import type { QueryDocumentSnapshot } from '@google-cloud/firestore'
import type { FCM } from '@/firestore/fcm/types'
import admin from 'firebase-admin'
import { IncomingWebhook } from '@slack/webhook'
import { config } from 'firebase-functions'
import { Config } from '@/types'
import { switchable } from '@/util'
import { includes } from 'core-fn'

const subscribeTopic = createFunctions()
  .firestore.document('fcm/{token}')
  .onCreate(
    async (snapshot: QueryDocumentSnapshot<Partial<FCM>>): Promise<boolean> => {
      const data = snapshot.data()
      const { token, topics } = data

      if (!token || !topics) {
        logger.error('token or topics is not exists', data)
        return false
      }

      const {
        slack: { subscription_fcm_url }
      } = config() as Config

      const fn = switchable(
        async () => {
          const result = await Promise.all(
            topics.map(
              async (topic) =>
                await admin
                  .messaging()
                  .subscribeToTopic(token, topic)
                  .then(() => {
                    logger.info('Success token subscribeToTopic', {
                      token,
                      topic
                    })

                    return true
                  })
                  .catch(() => {
                    logger.error('Fail token subscribeToTopic', {
                      token,
                      topic
                    })
                    return false
                  })
            )
          )

          const hasError = includes(false, result)

          if (hasError) {
            logger.error('Fail part of topic to subscribeToTopic', data)
            return false
          } else {
            logger.info('Success all topics subscription', data)

            const webhook = new IncomingWebhook(subscription_fcm_url)
            await webhook.send('Subscribe fcm 📲')

            return true
          }
        },
        async () => true
      )

      return fn()
    }
  )

export const onCreate = {
  subscribeTopic
}
