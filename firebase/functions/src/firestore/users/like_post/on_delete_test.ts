import { onDelete } from '@/firestore/users/like_post/on_delete'
import { firestore } from 'firebase-admin'
import { test } from '@test/util'

describe('likePost', () => {
  const likePost = test.wrap(onDelete.likePost)
  const postsCol = firestore().collection('posts')
  const usersCol = firestore().collection('users')

  const slug = 'xyz-slug'
  const slug1 = 'zzz-slug'
  it('should decrease like to posts/slug', async () => {
    const user = test.auth.exampleUserRecord()
    await postsCol.doc(slug).set({
      like: 1,
      likeBy: firestore.FieldValue.arrayUnion(usersCol.doc(user.uid))
    })

    const mock = test.firestore.makeDocumentSnapshot(
      {},
      `usres/${user.uid}/likePost/${slug}`
    )
    await likePost(mock, {
      params: {
        userId: user.uid,
        slug
      }
    })

    const snapshot = await postsCol.doc(slug).get()
    expect(snapshot.exists).toBeTruthy()
    expect(snapshot.id).toBe(slug)
    expect(snapshot.data()).toEqual({
      like: 0,
      likeBy: []
    })
  })

  it('should decrease what will be -1', async () => {
    const user = test.auth.exampleUserRecord()
    await postsCol.doc(slug1).set({
      like: 0,
      likeBy: []
    })

    const mock = test.firestore.makeDocumentSnapshot(
      {},
      `usres/${user.uid}/likePost/${slug1}`
    )
    await likePost(mock, {
      params: {
        userId: user.uid,
        slug: slug1
      }
    })

    const snapshot = await postsCol.doc(slug1).get()
    expect(snapshot.exists).toBeTruthy()
    expect(snapshot.id).toBe(slug1)
    expect(snapshot.data()).toEqual({
      like: -1,
      likeBy: []
    })
  })

  afterAll(async () => {
    await postsCol.doc(slug).delete()
    await postsCol.doc(slug1).delete()
  })
})
