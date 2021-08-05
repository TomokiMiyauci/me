import {
  renderTemplate,
  TemplateData,
  ellipsis,
  ellipsisContent,
  caseInsensitiveCount
} from '@/twitter/util'
import { configure } from 'eta'

const TITLE = 'Home | miyauci.me'
const DESCRIPTION = 'This is description.'
const LONG_DESCRIPTION =
  '新しい Firebase モジュールによって、どれほどバンドルサイズが削減できるか解説します。Firebase モジュールの中でも、特に利用頻度の高い Cloud Firestore と Authentication のバンドルサイズを中心に解説しています。'
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

${TITLE}
${DESCRIPTION}

${URL}`
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
  const table: [string, number, string, string][] = [
    ['abcde', 5, '...', 'ab...'],
    ['hello this is test', 8, '...', 'hello...']
  ]
  it.each(table)('ellipsis(%s, %d, %s) => %d', (val, len, a, expected) => {
    expect(ellipsis(val, len, a)).toBe(expected)
  })
})

describe('ellipsisContent', () => {
  beforeAll(() => {
    configure({
      views: 'views'
    })
  })

  const table: [string, TemplateData, string][] = [
    [
      'tweet',
      {
        url: URL,
        title: TITLE,
        description: DESCRIPTION
      },
      `🤖 A new article has been posted🚀

${TITLE}
${DESCRIPTION}

${URL}`
    ],
    [
      'tweet',
      {
        url: URL,
        title: 'Firebase のモジュラーSDKでバンドルサイズ比較',
        description: LONG_DESCRIPTION
      },
      `🤖 A new article has been posted🚀

Firebase のモジュラーSDKでバンドルサイズ比較
新しい Firebase モジュールによって、どれほどバンドルサイズが削減できるか解説します。Firebase モジュールの中でも、特に利用頻度の高い Cloud F...

${URL}`
    ],
    [
      'tweet_ja',
      {
        url: URL,
        title: 'Firebase のモジュラーSDKでバンドルサイズ比較',
        description: LONG_DESCRIPTION
      },
      `🤖 新しい記事を投稿しました🚀

Firebase のモジュラーSDKでバンドルサイズ比較
新しい Firebase モジュールによって、どれほどバンドルサイズが削減できるか解説します。Firebase モジュールの中でも、特に利用頻度の高い Cloud Fir...

${URL}`
    ]
  ]
  it.each(table)(
    'ellipsisContent(%s, %d) => %s',
    async (templateName, data, expected) => {
      expect(await ellipsisContent(templateName, data)).toBe(expected)
    }
  )
})

describe('caseInsensitiveCount', () => {
  const table: [string, number][] = [
    [
      `A new article has been postedFirebase のモジュラーSDKでバンドルサイズ比較新しい Firebase モジュールによって、どれほどバンドルサイズが削減できるか解説します。Firebase モジュールの中でも、特に利用頻度の高い Cloud Firestore と Authentication のバンドルサイズを中心に解説していま`,
      138
    ]
  ]
  it.each(table)('caseInsensitiveCount(%s) => %d', (val, expected) => {
    expect(caseInsensitiveCount(val)).toBe(expected)
  })
})
