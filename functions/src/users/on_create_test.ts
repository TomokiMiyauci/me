import { onCreate as _onCreate } from '@/users/on_create'
import { firestore } from 'firebase-admin'
import { test } from '@test/util'

const onCreate = test.wrap(_onCreate)
const user = test.auth.exampleUserRecord()

describe('onCreate', () => {
  afterAll(async () => {
    await firestore().collection('users').doc(user.uid).delete()
  })
  it('save user info to firestore /document/users/{uid}', async () => {
    const timestamp = new Date('2021/1/1 00:01:02')
    await onCreate(user, {
      timestamp: timestamp.toISOString()
    })

    const snapshot = await firestore().collection('users').doc(user.uid).get()

    expect(snapshot.exists).toBeTruthy()
    expect(snapshot.id).toBe(user.uid)
    expect(snapshot.data()).toEqual({
      uid: user.uid,
      createdAt: firestore.Timestamp.fromDate(timestamp)
    })
  })
})
