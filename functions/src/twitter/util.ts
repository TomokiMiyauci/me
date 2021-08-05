import type { Locale } from '@/../../config/types'
import { renderFile } from 'eta'
import { length, slice, test } from 'core-fn'

const isSingleByte = test(/[ -~]/)

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

const ellipsisContent = async (
  templateName: string,
  { url, title, description }: TemplateData
): Promise<string> => {
  const preContent = await renderTemplate<TemplateData>(templateName, {
    url,
    title,
    description
  })
  if (!preContent) return ''

  const _length = caseInsensitiveCount(preContent)
  const _diff = _length - 140

  if (_diff > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return await renderTemplate<TemplateData>(templateName, {
      url,
      title,
      description: ellipsis(
        description,
        caseInsensitiveCount(description) - _diff
      )
    })!
  } else {
    return preContent
  }
}

const ellipsis = (val: string, len: number, sep = '...'): string => {
  const head = slice(0, len - length(sep), val)
  return `${head}${sep}`
}

const caseInsensitiveCount = (val: string): number => {
  const _count = [...val].reduce((acc, char) => {
    acc = isSingleByte(char) ? acc + 0.5 : acc + 1
    return acc
  }, 0)

  return Math.ceil(_count)
}

export {
  templateName,
  renderTemplate,
  ellipsis,
  ellipsisContent,
  caseInsensitiveCount
}
export type { TemplateData }
