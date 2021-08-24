import {
  firestore,
  initializeTestApp,
  assertFails,
  clearFirestoreData,
  assertSucceeds
} from '@firebase/rules-unit-testing'

describe('delete /likePosts/{slug}', () => {
  const uid = 'anonymous'

  const app = initializeTestApp({
    projectId: 'test',
    auth: {
      uid
    }
  })

  describe('AUTH', () => {
    it('OK', async () => {
      const col = firestore(app)
        .collection('users')
        .doc(uid)
        .collection('likePosts')
      await assertSucceeds(col.doc('post').delete())
    })

    it('NG: another user', async () => {
      const app = initializeTestApp({
        projectId: 'test',
        auth: {
          uid: 'another-user'
        }
      })
      const col = firestore(app)
        .collection('users')
        .doc(uid)
        .collection('likePosts')
      await assertFails(col.doc('post').delete())
    })
  })

  describe('NOT_AUTH', () => {
    const app = initializeTestApp({
      projectId: 'test'
    })

    const collection = firestore(app)
      .collection('users')
      .doc(uid)
      .collection('likePosts')

    it('NG', async () => {
      await assertFails(collection.doc(uid).delete())
    })
  })

  afterAll(async () => {
    await app.delete()
    clearFirestoreData({
      projectId: 'test'
    })
  })
})
