import { Locale } from '@/../config/types'
import ky from 'ky'

const idMap = {
  en: 2600135,
  ja: 2600150,
  article: 2499579
}

const subscribe = async (email: string, locale: Locale) => {
  const localeTag = idMap[locale]

  return ky('https://api.convertkit.com/v3/forms/2439368/subscribe', {
    method: 'post',
    json: {
      api_key: process.env.GATSBY_CONVERTKIT_API_KEY,
      email,
      tags: [idMap['article'], localeTag]
    }
  })
}

export { subscribe }
