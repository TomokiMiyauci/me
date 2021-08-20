import { pushFCM as _pushFCM } from '@/meta/locales/on_create'
import type { Params } from '@/meta/locales/on_create'

import { test } from '@test/util'
import { Locale } from '@/../../../config/types'

const pushFCM = test.wrap(_pushFCM)
const context: Params = {
  locale: 'en',
  slug: 'test-slug'
}

describe('onCreate', () => {
  const table: [Record<PropertyKey, string>, Params, boolean][] = [
    [
      {
        test: '1'
      },
      context,
      false
    ],
    [
      {
        title: 'title'
      },
      context,
      false
    ],
    [
      {
        description: 'description'
      },
      context,
      false
    ],
    [
      {
        title: 'title',
        url: '/'
      },
      context,
      false
    ],
    [
      {
        title: 'title',
        description: 'description'
      },
      context,
      false
    ],
    [
      {
        description: 'description',
        url: '/'
      },
      context,
      false
    ],
    [
      {
        description: 'description',
        url: '/'
      },
      context,
      false
    ],
    [
      {
        title: 'title',
        description: 'description',
        url: '/'
      },
      { ...context, locale: 'unknown' as Locale },
      false
    ],
    [
      {
        title: 'title',
        description: 'description',
        url: '/'
      },
      { ...context, locale: 'ja' },
      true
    ],
    [
      {
        title: 'title',
        description: 'description',
        url: '/'
      },
      context,
      true
    ]
  ]
  it.each(table)(
    'should contain title, description and url',
    async (data, params, expected) => {
      const snap = test.firestore.makeDocumentSnapshot(
        data,
        `meta/${params.slug}/locales/${params.locale}`
      )

      const result = await pushFCM(snap, {
        params
      })
      expect(result).toBe(expected)
    }
  )
})
