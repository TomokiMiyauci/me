import { logger } from 'firebase-functions'
import { createFunctions } from '@/util'
import { firestore } from 'firebase-admin'
import type { Params } from '@/firestore/users/fcm/types'

const token = createFunctions()
  .firestore.document('users/{userId}/fcm/{token}')
  .onDelete(async (_, { params }): Promise<boolean> => {
    const { token } = params as Params

    return firestore()
      .collection('fcm')
      .doc(token)
      .delete({
        exists: true
      })
      .then(() => {
        logger.log(`Delete /document/fcm/${token}`)
        return true
      })
      .catch((e) => {
        logger.error(e)
        logger.info(`Tried to delete fcm/${token}, but it did not exist`)
        return false
      })
  })

export const onDelete = {
  token
}
