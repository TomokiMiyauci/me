import urlJoin from 'url-join'

const _prod = (import.meta as any).env ? (import.meta as any).env.PROD : true
export const DOMAIN = _prod ? 'https://miyauchi.dev' : 'http://localhost'
export const baseUrlJoin = (...parts: string[]): string =>
  urlJoin(DOMAIN, ...parts)
export const AUTHOR = 'Tomoki Miyauchi'
export const COPYRIGHT = '2021 ©Tomoki Miyauchi'
export const locales = ['en', 'ja'] as const
export type Locale = typeof locales[number]
