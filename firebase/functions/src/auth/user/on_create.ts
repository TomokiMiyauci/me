import { createFunctions } from '@/util'
import { firestore } from 'firebase-admin'
import { logger } from 'firebase-functions'

const saveUser = createFunctions()
  .auth.user()
  .onCreate(async ({ uid }, { timestamp }) => {
    const data: firestore.DocumentData = {
      uid,
      createdAt: new Date(Date.parse(timestamp))
    }

    return firestore()
      .collection('users')
      .doc(uid)
      .set(data)
      .then(() => {
        logger.log(`Save user info to firestore document/users/${uid}`, data)
      })
      .catch((e) => {
        logger.error(e)
        logger.error(
          `Fail to save user info to firestore document/users/${uid}`,
          data
        )
      })
  })

export const onCreate = { saveUser }
