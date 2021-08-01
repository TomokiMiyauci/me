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

export type { Config }
