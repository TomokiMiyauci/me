import { onCreate as _onCreate } from '@/meta/locales/ja/on_create'

import { test } from '@test/util'

const onCreate = test.wrap(_onCreate)

describe('onCreate', () => {
  const table: [Record<PropertyKey, string>, boolean][] = [
    [
      {
        test: '1'
      },
      false
    ],
    [
      {
        title: 'title'
      },
      false
    ],
    [
      {
        description: 'description'
      },
      false
    ],
    [
      {
        title: 'title',
        url: '/'
      },
      false
    ],
    [
      {
        title: 'title',
        description: 'description'
      },
      false
    ],
    [
      {
        description: 'description',
        url: '/'
      },
      false
    ],
    [
      {
        description: 'description',
        url: '/'
      },
      false
    ],
    [
      {
        title: 'title',
        description: 'description',
        url: '/'
      },
      true
    ]
  ]
  it.each(table)(
    'should contain title, description and url',
    async (data, expected) => {
      const snap = test.firestore.makeDocumentSnapshot(
        data,
        'meta/slug/locales/ja'
      )

      const result = await onCreate(snap)
      expect(result).toBe(expected)
    }
  )
})
