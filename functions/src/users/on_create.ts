import { createFunctions } from '@/util'
import { firestore } from 'firebase-admin'
import { logger } from 'firebase-functions'

const onCreate = createFunctions()
  .auth.user()
  .onCreate(async ({ uid }) => {
    const data: firestore.DocumentData = {
      uid,
      createdAt: firestore.FieldValue.serverTimestamp()
    }
    return firestore()
      .collection('users')
      .doc(uid)
      .create(data)
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

export { onCreate }
