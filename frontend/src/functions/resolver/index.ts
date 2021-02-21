import type { Locale } from 'vue-i18n'
import type { RouteRecordRaw } from 'vue-router'

import { isStartWithSlash } from '../utils'

const verdictLocale = (val: string): AvailableLocale[number] =>
  val.startsWith('/ja') ? 'ja' : 'en'

const tailingSlash = (val: string): string =>
  isTailingSlash(val) ? val.slice(0, -1) : val

const resolve = (
  {
    path,
    routes
  }: {
    path: string
    routes: RouteRecordRaw[]
  },
  locale: AvailableLocale[number]
): string => {
  const _path = pathResolver(
    {
      en: '/',
      ja: '/ja'
    },
    locale,
    path
  )

  const _route = routes.find(({ path }) => path === _path)
  return _route?.path || path
}

type AvailableLocale = ['en', 'ja']

const pathResolver = (
  localeMap: {
    [k in AvailableLocale[number]]: Locale
  },
  locale: AvailableLocale[number],
  path: string
): string => {
  const plainPath = discoverPlainPath(localeMap, path)

  const prefix = localeMap[locale]
  const compositePath = `${prefix}${plainPath}`
  const dupHeadSlash =
    compositePath.length > 1 && compositePath.substr(1, 1) === '/'
      ? compositePath.slice(1)
      : compositePath

  const tailedSlash =
    dupHeadSlash.length > 1 ? tailingSlash(dupHeadSlash) : dupHeadSlash

  return tailedSlash
}

const discoverPlainPath = (
  localeMap: {
    [k in AvailableLocale[number]]: Locale
  },
  path: string
): string => {
  const maxMatch = Object.entries(localeMap).map(([key, value]) => {
    const regex = new RegExp(String.raw`^${value}`, 'g')
    regex.exec(path)
    return {
      [key]: regex.lastIndex
    }
  })

  const maxMatchLocale = maxMatch.reduce((acc, cur) => {
    const [[key, value]] = Object.entries(cur)
    acc = acc.length < value ? key : acc
    return acc
  }, '')

  const baseMap = localeMap[maxMatchLocale as AvailableLocale[number]]
  const plainPath = path.replace(baseMap, '')
  if (!plainPath.length) return '/'
  return isStartWithSlash(plainPath) ? plainPath : `/${plainPath}`
}

const isTailingSlash = (val: string): boolean =>
  val.length > 1 && val.slice(-1) === '/'

export { discoverPlainPath, pathResolver, resolve, verdictLocale }
