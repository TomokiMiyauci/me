import { createFunctions } from '@/util'
import { firestore } from 'firebase-admin'
import { logger } from 'firebase-functions'
import { join } from 'path'

const likePost = createFunctions()
  .firestore.document('users/{userId}/likePosts/{slug}')
  .onDelete((_, { params }) => {
    const { slug, userId } = params

    return firestore()
      .collection('posts')
      .doc(slug)
      .set(
        {
          like: firestore.FieldValue.increment(-1),
          likeBy: firestore.FieldValue.arrayRemove(
            firestore().collection('users').doc(userId)
          )
        },
        {
          merge: true
        }
      )
      .then(() => {
        const content = `${join(
          'posts',
          slug
        )} liked has been canceled by ${userId}`

        logger.info(content)
      })
      .catch(logger.error)
  })

export const onDelete = {
  likePost
}
