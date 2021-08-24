import { logger } from 'firebase-functions'
import { createFunctions } from '@/util'
import type { QueryDocumentSnapshot } from '@google-cloud/firestore'
import type { FCM } from '@/firestore/fcm/types'
import { firestore } from 'firebase-admin'
import { join } from 'path'

const token = createFunctions()
  .firestore.document('users/{userId}/fcm/{token}')
  .onCreate(
    async (
      snapshot: QueryDocumentSnapshot<Partial<FCM>>,
      { timestamp, params }
    ) => {
      const data = snapshot.data()
      const { token, topics } = data

      if (!token || !topics) {
        logger.error('token or topics is not exists', data)
        return false
      }

      const userRef = firestore().doc(
        snapshot.ref.parent.parent?.path ?? join('users', params.userId)
      )

      const writeData = {
        token,
        topics,
        userRef,
        createdAt: new Date(Date.parse(timestamp))
      }

      return firestore()
        .collection('fcm')
        .doc(token)
        .set(writeData)
        .then(() => {
          logger.log(`Create /document/fcm/${token}`, {
            writeData
          })
        })
        .catch(logger.error)
    }
  )

export const onCreate = {
  token
}
