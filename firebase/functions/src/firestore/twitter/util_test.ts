import {
  renderTemplate,
  TemplateData,
  ellipsis
} from '@/firestore/twitter/util'
import { configure } from 'eta'
import { parseTweet } from 'twitter-text'

const TITLE = 'Home | miyauci.me'
const DESCRIPTION = 'This is description.'
const LONG_DESCRIPTION =
  '新しい Firebase モジュールによって、どれほどバンドルサイズが削減できるか解説します。Firebase モジュールの中でも、特に利用頻度の高い Cloud Firestore と Authentication のバンドルサイズを中心に解説しています。'
const URL = 'https://miyauchi.dev/'

describe('renderTemplate', () => {
  const table: [string, TemplateData, string][] = [
    [
      'tweet',
      {
        title: TITLE,
        description: DESCRIPTION,
        url: URL
      },
      `🤖 A new article has been posted🚀

${URL}

${TITLE}
${DESCRIPTION}`
    ],
    [
      'tweet_ja',
      {
        title: TITLE,
        description: DESCRIPTION,
        url: URL
      },
      `🤖 新しい記事を投稿しました🚀

${URL}

${TITLE}
${DESCRIPTION}`
    ]
  ]
  beforeAll(() => {
    configure({
      views: 'views'
    })
  })
  it.each(table)(
    'renderTemplate(%d) => %d',
    async (templateName, dataObj, expected) => {
      expect(await renderTemplate(templateName, dataObj)).toBe(expected)
    }
  )
})

describe('ellipsis', () => {
  const table: [string, string][] = [
    [
      `🤖 A new article has been posted🚀

${TITLE}
${DESCRIPTION}

${URL}`,
      `🤖 A new article has been posted🚀

${TITLE}
${DESCRIPTION}

${URL}`
    ],
    [
      `🤖 A new article has been posted🚀

${URL}

Firebase のモジュラーSDKでバンドルサイズ比較
${DESCRIPTION}`,
      `🤖 A new article has been posted🚀

${URL}

Firebase のモジュラーSDKでバンドルサイズ比較
${DESCRIPTION}`
    ],
    [
      `🤖 A new article has been posted🚀

${URL}

Firebase のモジュラーSDKでバンドルサイズ比較
${LONG_DESCRIPTION}`,
      `🤖 A new article has been posted🚀

https://miyauchi.dev/

Firebase のモジュラーSDKでバンドルサイズ比較
新しい Firebase モジュールによって、どれほどバンドルサイズが削減できるか解説します。Firebase モジュールの中でも、特に利用頻度の高い Cloud Firestore と Authentication の...`
    ]
  ]
  it.each(table)('ellipsis(%s) => %s', (val, expected) => {
    const content = ellipsis(val)
    expect(content).toEqual(expected)
    expect(parseTweet(content).valid).toBeTruthy()
  })
})
