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
    const timestamp = new Date('2021/1/1 00:01:02')
    await onCreate(user, {
      timestamp: timestamp.toISOString()
    })

    const snapshot = (await firestore()
      .collection('users')
      .doc(UID)
      .get()) as DocumentSnapshot<{ uid: string; createdAt: Timestamp }>
    expect(snapshot.exists).toBeTruthy()
    expect(snapshot.id).toBe(UID)
    const uid = snapshot.data()?.uid
    const createdAt = snapshot.data()?.createdAt
    expect(uid).toBe(UID)
    expect(
      createdAt?.isEqual(firestore.Timestamp.fromDate(timestamp))
    ).toBeTruthy()
  })
})
