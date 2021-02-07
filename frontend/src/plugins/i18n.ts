import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import ja from '@/locales/ja.json'
const i18n = createI18n({
  legacy: false,
  locale: 'ja',
  messages: {
    en,
    ja
  }
})

const DEFAULT_LOCALE = 'en'
export { DEFAULT_LOCALE }
export default i18n
