import urlJoin from 'url-join'

export const DOMAIN = import.meta.env.PROD
  ? 'https://miyauchi.dev'
  : 'http://localhost:3000'
export const baseUrlJoin = (...parts: string[]): string =>
  urlJoin(DOMAIN, ...parts)
export const AUTHOR = 'Tomoki Miyauchi'
export const COPYRIGHT = '2021 ©Tomoki Miyauchi'
export const locales = ['en', 'ja'] as const
export type Locale = typeof locales[number]
