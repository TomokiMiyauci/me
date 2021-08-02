import type { Locale } from '@/../../config/types'

const templateName = (locale: Locale): string => {
  const fileName = locale === 'en' ? 'tweet' : 'tweet_ja'

  return `./${fileName}`
}

export {
  templateName
}
