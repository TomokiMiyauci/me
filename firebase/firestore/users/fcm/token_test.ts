import {
  firestore,
  initializeTestApp,
  assertFails,
  clearFirestoreData,
  assertSucceeds
} from '@firebase/rules-unit-testing'

describe('/fcm/{token}', () => {
  const uid = 'anonymous'
  const app = initializeTestApp({
    projectId: 'test',
    auth: {
      uid
    }
  })
  const token = 'token'

  const validData = {
    token,
    topics: firestore.FieldValue.arrayUnion('article', 'en'),
    createdAt: firestore.FieldValue.serverTimestamp()
  }
  describe('AUTH', () => {
    const col = firestore(app).collection('users').doc(uid).collection('fcm')

    it('OK', async () => {
      await assertSucceeds(col.doc(token).set(validData))
    })
  })

  describe('NOT_AUTH', () => {
    const app = initializeTestApp({
      projectId: 'test'
    })

    const collection = firestore(app)
      .collection('users')
      .doc(uid)
      .collection('fcm')

    const table: [Record<PropertyKey, unknown>][] = [
      [{}],
      [
        {
          token: ''
        }
      ],
      [
        {
          topics: []
        }
      ],
      [
        {
          createdAt: firestore.FieldValue.serverTimestamp()
        }
      ],
      [
        {
          topics: [],
          createdAt: firestore.FieldValue.serverTimestamp()
        }
      ],
      [
        {
          token: '',
          createdAt: firestore.FieldValue.serverTimestamp()
        }
      ],
      [
        {
          token: '',
          topics: []
        }
      ]
    ]

    it.each(table)('NG:token, topics, createdAt is necessary', async (data) => {
      await assertFails(collection.doc(uid).set(data))
    })

    it('/fcm/{token} equal to data.token', async () => {
      await assertFails(collection.doc('unknown').set(validData))
    })
  })

  afterAll(async () => {
    await app.delete()
    clearFirestoreData({
      projectId: 'test'
    })
  })
})
