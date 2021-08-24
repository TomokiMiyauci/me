import { Timestamp } from '@google-cloud/firestore'
import { onCreate } from '@/firestore/fcm/on_create'
import { test } from '@test/util'
import type { FCM } from '@/firestore/fcm/types'

const subscribeTopic = test.wrap(onCreate.subscribeTopic)

describe('fcm', () => {
  beforeAll(() => {
    test.mockConfig({
      slack: {
        subscription_fcm_url: '<webhook_url>'
      }
    })
  })

  afterAll(() => {
    test.cleanup()
  })

  const table: [FCM, boolean][] = [
    [
      {
        token: '',
        topics: ['article'],
        createdAt: new Timestamp(0, 0)
      },
      false
    ],
    [
      {
        token: 'token',
        topics: ['article'],
        createdAt: new Timestamp(0, 0)
      },
      true
    ]
  ]

  it.each(table)('should contain token and topics', async (data, expected) => {
    const snapshot = test.firestore.makeDocumentSnapshot(data, 'fcm/token')

    expect(await subscribeTopic(snapshot)).toBe(expected)
  })
})
