export const DOMAIN = 'https://miyauchi.dev'
export const AUTHOR = 'Tomoki Miyauchi'
export const locales = ['en', 'ja'] as const
export type Locale = typeof locales[number]
