import { Timestamp } from '@google-cloud/firestore'
import { onCreate } from '@/users/fcm/on_create'
import { firestore } from 'firebase-admin'
import { test } from '@test/util'

describe('token', () => {
  const token = test.wrap(onCreate.token)

  it('should contain token and topics', async () => {
    const mock = test.firestore.makeDocumentSnapshot(
      {
        token: '',
        topics: ['article'],
        createdAt: new Timestamp(0, 0)
      },
      `users/user/fcm/token`
    )
    expect(await token(mock)).toBeFalsy()
  })

  const _token = 'token'
  const doc = firestore().collection('fcm').doc(_token)

  it(`write to fcm/${token}`, async () => {
    const data = {
      token: _token,
      topics: ['article']
    }
    const timestamp = new Date('2021/1/1 00:01:01')
    const userId = 'user-id'

    const mock = test.firestore.makeDocumentSnapshot(
      data,
      `users/${userId}/fcm/${_token}`
    )
    await token(mock, {
      timestamp: timestamp.toISOString()
    })
    const snapshot = await doc.get()
    expect(snapshot.exists).toBeTruthy()
    expect(snapshot.id).toBe(data.token)
    expect(snapshot.data()).toEqual({
      ...data,
      userRef: firestore().collection('users').doc(userId),
      createdAt: firestore.Timestamp.fromDate(timestamp)
    })
  })

  afterAll(async () => {
    await doc.delete()
  })

  // it.each(table)('should contain token and topics', async (data, expected) => {
  //   const mock = test.firestore.makeDocumentSnapshot(
  //     data,
  //     `users/user/fcm/token`
  //   )
  //   expect(await fcm(mock)).toBe(expected)
  //   const snapshot = await firestore().collection('fcm').doc(data.token).get()
  //   expect(snapshot.exists).toBeTruthy()
  //   expect(snapshot.id).toBe(data.token)
  // })
})
