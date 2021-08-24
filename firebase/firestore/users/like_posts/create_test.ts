import {
  firestore,
  initializeTestApp,
  assertFails,
  clearFirestoreData,
  assertSucceeds
} from '@firebase/rules-unit-testing'

describe('create /likePosts/{slug}', () => {
  const uid = 'anonymous'

  const app = initializeTestApp({
    projectId: 'test',
    auth: {
      uid
    }
  })

  const validData = {
    postRef: firestore(app).collection('posts').doc('post'),
    createdAt: firestore.FieldValue.serverTimestamp()
  }
  describe('AUTH', () => {
    it('OK', async () => {
      const col = firestore(app)
        .collection('users')
        .doc(uid)
        .collection('likePosts')
      await assertSucceeds(col.doc('post').set(validData))
    })

    it('NG: invalid data', async () => {
      const col = firestore(app)
        .collection('users')
        .doc(uid)
        .collection('likePosts')
      await assertFails(
        col.doc('post').set({ ...validData, invalid: 'invalid' })
      )
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
      await assertFails(col.doc('post').set(validData))
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

    const table: [Record<PropertyKey, unknown>][] = [
      [{}],
      [
        {
          postRef: ''
        }
      ],
      [
        {
          createdAt: firestore.FieldValue.serverTimestamp()
        }
      ],
      [
        {
          postRef: '',
          createdAt: firestore.FieldValue.serverTimestamp()
        }
      ]
    ]

    it.each(table)('NG:postRef, createdAt is necessary', async (data) => {
      await assertFails(collection.doc(uid).set(data))
    })
  })

  afterAll(async () => {
    await app.delete()
    clearFirestoreData({
      projectId: 'test'
    })
  })
})
