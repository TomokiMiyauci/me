import functions from 'firebase-functions'
import {
  parseCommand,
  commandFn,
  replay,
  subscribe,
  getKeyValue
} from '@/line/util'
import type { WebhookRequestBody } from '@line/bot-sdk'
import { SUBSCRIBE } from '@/line/constants'

const line = functions
  .region('asia-northeast1')
  .runWith({
    memory: '128MB'
  })
  .https.onRequest(async ({ body }, res) => {
    functions.logger.info('request', (body as WebhookRequestBody).events)

    const event = ((body as WebhookRequestBody).events ?? [])[0]

    if (!['message', 'join', 'follow'].includes(event.type)) {
      res.status(200).end()
      return
    }

    const [key, value] = getKeyValue(event.source)

    switch (event.type) {
      case 'message': {
        if (!event || event.message.type !== 'text' || !key || !value) {
          res.status(200).end()
          return
        }
        const [cmd, err] = parseCommand(event.message.text)

        if (!err || !cmd) {
          res.status(200).end()
          return
        }
        const replyToken = event.replyToken

        const [fn, message] = commandFn(cmd)

        try {
          await fn({ id: value, type: key })
          await replay(message, replyToken)
          res.status(200).end()
          return
        } catch {
          await replay(
            `An error has occurred🚧

    Please send message after a while.`,
            replyToken
          )

          res.status(500).end()
          return
        }
      }

      case 'follow':
      case 'join': {
        try {
          const replyToken = event.replyToken

          await subscribe({
            id: value,
            type: key
          })
          await replay(SUBSCRIBE, replyToken)
          res.status(200).end()
          return
        } catch {
          res.status(500).end()
          return
        }
      }
    }
  })

export { line }
