import type { Timestamp } from '@google-cloud/firestore'

/**
 * Alias for firestore /document/fcm/{token} data
 */
type FCM = {
  token: string
  topics: string[]
  createdAt: Timestamp
}

export type { FCM }
