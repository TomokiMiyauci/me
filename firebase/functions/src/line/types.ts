import type { User, Group, Room } from '@line/bot-sdk'

type Type = User['type'] | Group['type'] | Room['type']
type Commands = 'help' | 'subscribe' | 'unsubscribe'
type ParseResult = ['', false] | [Commands, true]

type Data = {
  id: string
  type: Type
}

type CommandFn = (data: Data) => Promise<void> | void

export type { Commands, ParseResult, Type, CommandFn }
