import fetch from 'node-fetch'
import { createFunctions } from '@/util'
import { SITEMAP_URL, BASE_URL } from '@/firestore/meta/locales/ja/constants'
import { IncomingWebhook } from '@slack/webhook'
import { config, logger } from 'firebase-functions'
import functions from 'firebase-functions'
import { renderFile } from 'eta'
import { firestore } from 'firebase-admin'
import { Client } from '@line/bot-sdk'
import type { Post, Config } from '@/types'

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

const lineMessage = createFunctions()
  .firestore.document('meta/{slug}/locales/ja')
  .onCreate(async (snapshot) => {
    const { url, shortUrl } = snapshot.data() as Partial<Post>

    if (!url) {
      functions.logger.error('Something data is undefined')
      return
    }
    const content = await renderFile('line_newsletter_ja', {
      url: shortUrl ?? url
    })

    if (!content) return

    const { docs } = await firestore().collection('line').get()

    const { channel_access_token: channelAccessToken } = (
      functions.config() as Config
    ).line

    const client = new Client({
      channelAccessToken
    })

    return Promise.all(
      docs.map(({ id }) =>
        client.pushMessage(id, {
          type: 'text',
          text: content
        })
      )
    )
  })

export const onCreate = {
  ping,
  lineMessage
}
