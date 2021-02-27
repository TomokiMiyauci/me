import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import ja from '@/locales/ja.json'
const DEFAULT_LOCALE = 'en'

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  messages: {
    en,
    ja
  }
})

export { DEFAULT_LOCALE }
export default i18n
