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

  slack: {
    subscription_fcm_url: string
  }
}

type Post = {
  url: string
  shortUrl: string
  title: string
  description: string
  locale: Locale
}

export type { Config, Post }
