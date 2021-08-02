import functions from 'firebase-functions'
import { renderFile } from 'eta'
import type { Post } from '@/types'
import { firestore } from 'firebase-admin'
import { Client } from '@line/bot-sdk'
import type { Config } from '@/types'

export const onCreateMetaPostJa = functions
  .region('asia-northeast1')
  .runWith({
    memory: '128MB'
  })
  .firestore.document('meta/{slug}/locales/ja')
  .onCreate(async (snapshot) => {
    const { url } = snapshot.data() as Partial<Post>

    if (!url) {
      functions.logger.error('Something data is undefined')
      return
    }
    const content = await renderFile('line_newsletter_ja', {
      url
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
