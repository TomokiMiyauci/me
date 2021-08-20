import fetch from 'node-fetch'
import { createFunctions } from '@/util'
import { SITEMAP_URL, BASE_URL } from '@/meta/locales/ja/constants'
import { IncomingWebhook } from '@slack/webhook'
import type { Config } from '@/types'
import { config, logger } from 'firebase-functions'

const ping = createFunctions()
  .firestore.document('meta/{slug}/locales/ja')
  .onCreate(async () => {
    const searchParams = new URLSearchParams({
      sitemap: SITEMAP_URL
    })

    const url = new URL('ping', BASE_URL)

    url.search = searchParams.toString()
    const res = await fetch(url)

    if (res.status === 200) {
      const {
        slack: { firebase_functions_log_url }
      } = config() as Config
      const webhook = new IncomingWebhook(firebase_functions_log_url)

      logger.info('Success to ping to Google Search Console')
      webhook.send('Success to ping to Google Search Console')
    } else {
      console.error('Fail to ping to Google Search Console')
    }
  })

export const onCreate = {
  ping
}
