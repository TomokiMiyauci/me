import { onDelete } from '@/users/fcm/on_delete'
import { firestore } from 'firebase-admin'
import { test } from '@test/util'

describe('token', () => {
  const token = test.wrap(onDelete.token)

  const _token = 'token-1'
  const doc = firestore().collection('fcm').doc(_token)

  it(`delete fcm/${token}`, async () => {
    const timestamp = new Date('2021/1/1 00:01:01')
    const user = test.auth.exampleUserRecord()
    const userId = user.uid
    const userRef = firestore().collection('users').doc(userId)

    const data = {
      token: _token,
      topics: ['article'],
      createdAt: timestamp,
      userRef
    }

    const doc = firestore().collection('fcm').doc(_token)
    await doc.set(data)
    const result = await token(undefined, {
      params: {
        userId,
        token: _token
      }
    })
    expect(result).toBeTruthy()
    const snapshot = await doc.get()
    expect(snapshot.exists).toBeFalsy()
  })

  it(`should warning when fcm/token record is not exist`, async () => {
    const user = test.auth.exampleUserRecord()
    const userId = user.uid
    const result = await token(undefined, {
      params: {
        userId,
        token: _token
      }
    })

    const snapshot = await doc.get()
    expect(snapshot.exists).toBeFalsy()
    expect(result).toBeFalsy()
  })

  afterAll(async () => {
    await doc.delete()
  })
})
