import { onCreate as _onCreate } from '@/users/on_create'
import { firestore } from 'firebase-admin'
import { DocumentSnapshot, Timestamp } from '@google-cloud/firestore'
import { test } from '@test/util'

const UID = 'anonymous'
const onCreate = test.wrap(_onCreate)

describe('onCreate', () => {
  afterAll(async () => {
    test.cleanup()
    await firestore().collection('users').doc(UID).delete()
  })
  it('save user info to firestore /document/users/{uid}', async () => {
    const user = test.auth.exampleUserRecord()
    user.uid = UID
    await onCreate(user)

    const snapshot = (await firestore()
      .collection('users')
      .doc(UID)
      .get()) as DocumentSnapshot<{ uid: string; createdAt: Timestamp }>
    expect(snapshot.exists).toBeTruthy()
    expect(snapshot.id).toBe(UID)
    const uid = snapshot.data()?.uid
    expect(uid).toBe(UID)
    expect(snapshot.data()?.createdAt).toBeDefined()
  })
})
