import type { Locale } from '@/../../config/types'
import { renderFile } from 'eta'
import { parseTweet } from 'twitter-text'

const templateName = (locale: Locale): string => {
  const fileName = locale === 'en' ? 'tweet' : 'tweet_ja'

  return `./${fileName}`
}

type TemplateData = {
  title: string
  description: string
  url: string
}

const renderTemplate = <T extends Record<PropertyKey, string>>(
  templateName: string,
  data: T
): void | Promise<string> => renderFile(templateName, data)

const ellipsis = (val: string, delimiter = '...'): string => {
  const { valid, validRangeEnd } = parseTweet(val)

  if (valid) return val

  const { validRangeEnd: _ } = parseTweet(delimiter)
  const slicedVal = val.slice(0, validRangeEnd - _)

  return `${slicedVal}${delimiter}`
}

export { templateName, renderTemplate, ellipsis }
export type { TemplateData }
