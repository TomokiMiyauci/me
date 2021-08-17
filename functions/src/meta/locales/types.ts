import type { Timestamp } from '@google-cloud/firestore'

/**
 * Alias for firestore /document/meta/{slug}/locales/{locale}
 */
type MetaLocales = {
  title: string
  description: string
  url: string
  shortUrl: string
  createdAt: Timestamp
}

export type { MetaLocales }
