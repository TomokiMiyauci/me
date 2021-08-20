import { onCreate } from '@/meta/locales/ja/on_create'
import { test } from '@test/util'
import fetch, { Response } from 'node-fetch'

const ping = test.wrap(onCreate.ping)

describe('ping', () => {
  beforeAll(() => {
    jest.mock('node-fetch')
    test.mockConfig({
      slack: {
        firebase_functions_log_url:
          'https://hooks.slack.com/services/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'
      }
    })
  })
  afterAll(() => {
    test.cleanup()
  })
  it('', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response('4')))
    const result = await ping({})
    expect(fetch).toHaveBeenCalledTimes(1)
    console.log(result)
  })
})
