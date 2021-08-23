import { onCreate } from '@/auth/user/on_create'
import { firestore } from 'firebase-admin'
import { test } from '@test/util'

const saveUser = test.wrap(onCreate.saveUser)
const user = test.auth.exampleUserRecord()

describe('onCreate', () => {
  afterAll(async () => {
    await firestore().collection('users').doc(user.uid).delete()
  })
  it('save user info to firestore /document/users/{uid}', async () => {
    const timestamp = new Date('2021/1/1 00:01:02')
    await saveUser(user, {
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
