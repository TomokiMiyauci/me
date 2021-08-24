import { onCreate } from '@/firestore/users/like_post/on_create'
import { firestore } from 'firebase-admin'
import { test } from '@test/util'

describe('likePost', () => {
  const likePost = test.wrap(onCreate.likePost)
  const postsCol = firestore().collection('posts')
  const usersCol = firestore().collection('users')

  describe('document is already exists', () => {
    const slug = 'abc-slug'
    const slug1 = 'efg-slug'
    it('should save like and likeBy to posts/slug', async () => {
      await postsCol.doc(slug).set({
        like: 2,
        likeBy: firestore.FieldValue.arrayUnion(
          usersCol.doc('user-1'),
          usersCol.doc('user-2')
        )
      })

      const user = test.auth.exampleUserRecord()
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
      expect(snapshot.data()).toEqual({
        like: 3,
        likeBy: [
          usersCol.doc('user-1'),
          usersCol.doc('user-2'),
          usersCol.doc(user.uid)
        ]
      })
    })

    it('should save like and likeBy to posts/slug when likeBy is exists', async () => {
      const userId = 'user-2'
      await postsCol.doc(slug1).set({
        like: 2,
        likeBy: firestore.FieldValue.arrayUnion(
          usersCol.doc('user-1'),
          usersCol.doc(userId)
        )
      })

      const user = test.auth.exampleUserRecord()
      user.uid = userId
      const mock = test.firestore.makeDocumentSnapshot(
        {},
        `usres/${userId}/likePost/${slug1}`
      )
      await likePost(mock, {
        params: {
          userId,
          slug: slug1
        }
      })

      const snapshot = await postsCol.doc(slug1).get()
      expect(snapshot.data()).toEqual({
        like: 3,
        likeBy: [usersCol.doc('user-1'), usersCol.doc('user-2')]
      })
    })

    afterAll(async () => {
      await postsCol.doc(slug1).delete()
      await postsCol.doc(slug).delete()
    })
  })

  describe('document is not exist', () => {
    const slug = 'awesome-slug'
    it('should save like and likeBy to posts/slug', async () => {
      const user = test.auth.exampleUserRecord()
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
        like: 1,
        likeBy: [usersCol.doc(user.uid)]
      })
    })

    afterAll(async () => {
      await postsCol.doc(slug).delete()
    })
  })
})
