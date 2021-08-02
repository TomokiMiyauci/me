import type { Locale } from '@/../../config/types'
type Config = {
  twitter: {
    app_key: string
    app_secret: string
    access_token: string
    access_secret: string
  }

  line: {
    channel_access_token: string
  }
}

type Post = {
  url: string
  title: string
  description: string
  locale: Locale
}

export type { Config, Post }
