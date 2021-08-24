import { createFunctions } from '@/util'
import { firestore } from 'firebase-admin'
import { switchable } from '@/util'
import { IncomingWebhook } from '@slack/webhook'
import { config, logger } from 'firebase-functions'
import { join } from 'path'
import type { Config } from '@/types'

const likePost = createFunctions()
  .firestore.document('users/{userId}/likePost/{slug}')
  .onCreate((_, { params }) => {
    const { slug, userId } = params

    const content = `${join('posts', slug)} has been liked by ${userId}`
    const log = switchable(
      async () => {
        const {
          slack: { firebase_functions_log_url }
        } = config() as Config
        const webhook = new IncomingWebhook(firebase_functions_log_url)
        logger.info(content, {
          slug,
          userId
        })
        await webhook.send(content)
      },
      async () => {
        logger.info(content)
      }
    )

    return firestore()
      .collection('posts')
      .doc(slug)
      .set(
        {
          like: firestore.FieldValue.increment(1),
          likeBy: firestore.FieldValue.arrayUnion(
            firestore().collection('users').doc(userId)
          )
        },
        {
          merge: true
        }
      )
      .then(log)
      .catch(logger.error)
  })

export const onCreate = {
  likePost
}
