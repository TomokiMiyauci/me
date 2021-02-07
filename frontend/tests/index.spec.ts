import type { RouteRecordRaw } from 'vue-router'

import {
  discoverPlainPath,
  pathResolver,
  resolve
} from '../src/functions/resolver'
describe('resolver', () => {
  const routes: RouteRecordRaw[] = [
    {
      path: '/',
      component: {}
    }
  ]
  const locale = 'en' as const
  const path = '/ja'
  it('should return', () => {
    const result = resolve({ path, routes }, locale)

    expect(result).toBe('/')
  })

  it('should fallback', () => {
    const locale = 'ja' as const
    const path = '/ja'

    const result = resolve({ path, routes }, locale)

    expect(result).toBe(path)
  })

  it('should return ja path', () => {
    const routes: RouteRecordRaw[] = [
      {
        path: '/posts',
        component: {}
      },
      {
        path: '/ja/posts',
        component: {}
      }
    ]
    const locale = 'ja' as const
    const path = '/posts'

    const result = resolve({ path, routes }, locale)

    expect(result).toBe('/ja/posts')
  })
  it('should fallback path', () => {
    const routes: RouteRecordRaw[] = [
      {
        path: '/posts',
        component: {}
      }
    ]
    const locale = 'ja' as const
    const path = '/posts'

    const result = resolve({ path, routes }, locale)

    expect(result).toBe(path)
  })

  it('should fallback path', () => {
    const routes: RouteRecordRaw[] = [
      {
        path: '/ja',
        component: {}
      },
      {
        path: '/',
        component: {}
      },
      {
        path: '/posts',
        component: {}
      },
      {
        path: '/ja/posts',
        component: {}
      }
    ]
    const locale = 'en' as const
    const path = '/ja/posts'

    const result = resolve({ path, routes }, locale)

    expect(result).toBe('/posts')
  })
})

describe('pathResolver', () => {
  it('should return', () => {
    const result = pathResolver(
      {
        ja: '/ja',
        en: '/'
      },
      'en',
      '/ja/hoge'
    )

    expect(result).toBe('/hoge')
  })

  it('should return', () => {
    const result = pathResolver(
      {
        ja: '/ja',
        en: '/'
      },
      'ja',
      '/ja/hoge'
    )

    expect(result).toBe('/ja/hoge')
  })
  it('should return', () => {
    const result = pathResolver(
      {
        ja: '/ja',
        en: '/'
      },
      'ja',
      '/'
    )

    expect(result).toBe('/ja')
  })
  it('should return', () => {
    const result = pathResolver(
      {
        ja: '/ja',
        en: '/'
      },
      'ja',
      '/ja/posts'
    )

    expect(result).toBe('/ja/posts')
  })
  it('should return', () => {
    const result = pathResolver(
      {
        ja: '/ja',
        en: '/'
      },
      'en',
      '/'
    )

    expect(result).toBe('/')
  })

  it('should return', () => {
    const result = pathResolver(
      {
        ja: '/ja',
        en: '/'
      },
      'en',
      '/ja'
    )

    expect(result).toBe('/')
  })

  it('should return', () => {
    const result = pathResolver(
      {
        ja: '/ja',
        en: '/'
      },
      'en',
      '/ja/posts'
    )

    expect(result).toBe('/posts')
  })
})

describe('discoverPlainPath', () => {
  const localeMap = {
    ja: '/ja',
    en: '/'
  }
  it('should return', () => {
    const result = discoverPlainPath(localeMap, '/hoge')

    expect(result).toBe('/hoge')
  })

  it('should return ', () => {
    const result = discoverPlainPath(localeMap, '/ja/hoge')

    expect(result).toBe('/hoge')
  })

  it('should return ', () => {
    const result = discoverPlainPath(localeMap, '/')

    expect(result).toBe('/')
  })

  it('should return ', () => {
    const result = discoverPlainPath(localeMap, '/ja')

    expect(result).toBe('/')
  })

  it('should return ', () => {
    const result = discoverPlainPath(localeMap, '/ja/ja/hoge')

    expect(result).toBe('/ja/hoge')
  })

  it('should return ', () => {
    const result = discoverPlainPath(localeMap, '/hoge/hoge')

    expect(result).toBe('/hoge/hoge')
  })

  it('should return ', () => {
    const result = discoverPlainPath(localeMap, '/hoge/hoge')

    expect(result).toBe('/hoge/hoge')
  })

  it('should return ', () => {
    const result = discoverPlainPath(localeMap, '/hoge/ja/hoge')

    expect(result).toBe('/hoge/ja/hoge')
  })
})
