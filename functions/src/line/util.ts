import { toLowerCase, includes } from 'core-fn'
import type { Commands, ParseResult, Type, CommandFn } from '@/line/types'
import { firestore } from 'firebase-admin'
import { Client } from '@line/bot-sdk'
import type { Config } from '@/types'
import functions from 'firebase-functions'
import type { EventSource } from '@line/bot-sdk'

const commands = ['help', 'subscribe', 'unsubscribe'] as const

const parseCommand = (val: string): ParseResult => {
  const lower = toLowerCase(val)
  const result = includes(lower, commands)

  if (result) {
    return [lower as Commands, result]
  }

  return ['', result]
}

const getKeyValue = (val: EventSource): [Type, string] => {
  switch (val.type) {
    case 'user': {
      return [val.type, val.userId]
    }

    case 'group': {
      return [val.type, val.groupId]
    }

    case 'room': {
      return [val.type, val.roomId]
    }
  }
}

const subscribe: CommandFn = async ({ id, type }) => {
  await firestore().collection('line').doc(id).set({
    id,
    type
  })
}

const unsubscribe: CommandFn = async ({ id }) => {
  await firestore().collection('line').doc(id).delete()
}

const help: CommandFn = () => {
  return
}

const replay = async (message: string, token: string) => {
  const { channel_access_token: channelAccessToken } = (
    functions.config() as Config
  ).line

  const client = new Client({
    channelAccessToken
  })

  await client.replyMessage(token, {
    type: 'text',
    text: message
  })
}

const commandFn = (type: Commands): [CommandFn, string] => {
  switch (type) {
    case 'help': {
      return [
        help,
        `version: 1.0.0
「subscribe」\tSubscribe newsletter
「unsubscribe」\tUnsubscribe newsletter
「help」\tShow help`
      ]
    }

    case 'subscribe': {
      return [
        subscribe,
        `Subscribe my newsletter🎉
To unsubscribe,「unsubscribe」

You can find all the commands with 「help」`
      ]
    }

    case 'unsubscribe': {
      return [
        unsubscribe,
        `Unsubscribe my newsletter👋
To subscribe,「subscribe」

You can find all the commands with 「help」`
      ]
    }
  }
}

export { parseCommand, getKeyValue, subscribe, unsubscribe, commandFn, replay }
export type { ParseResult }
