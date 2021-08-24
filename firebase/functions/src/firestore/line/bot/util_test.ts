import { parseCommand, ParseResult } from '@/firestore/line/bot/util'

describe('parseCommand', () => {
  const table: [string, ParseResult][] = [
    ['', ['', false]],
    ['test', ['', false]],
    ['help', ['help', true]],
    ['Subscribe', ['subscribe', true]],
    ['unsubscribe', ['unsubscribe', true]]
  ]
  it.each(table)('parseCommand(%d) => %d', (val, expected) => {
    expect(parseCommand(val)).toEqual(expected)
  })
})
