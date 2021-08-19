import { onCreate } from '@/users/on_create'
import _test from 'firebase-functions-test'
import { firestore } from 'firebase-admin'
import { setup } from '@/util'
import { resolve } from 'path'
import { DocumentSnapshot, Timestamp } from '@google-cloud/firestore'

setup()

const UID = 'anonymous'
const test = _test(
  {
    projectId: 'blorogue-dev'
  },
  resolve(__dirname, '..', '..', '.env.dev.json')
)
const wrapped = test.wrap(onCreate)

describe('onCreate', () => {
  afterAll(async () => {
    test.cleanup()
    await firestore().collection('users').doc(UID).delete()
  })
  it('save user info to firestore /document/users/{uid}', async () => {
    const user = test.auth.exampleUserRecord()
    user.uid = UID
    await wrapped(user)

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
