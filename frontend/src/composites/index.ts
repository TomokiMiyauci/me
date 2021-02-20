import routes from 'pages-generated'
import { computed, ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'

import { resolve } from '@/functions/resolver'

type Locales = 'ja' | 'en'

const useLocalePath = (): {
  localePath: (path: string, locale: Locales) => string
  switchedLocale: ComputedRef<Locales>
} => {
  const { locale } = useI18n()

  const localePath = (path: string, locale: Locales) => {
    return resolve({ path, routes }, locale)
  }

  const switchedLocale = computed<Locales>(() => {
    switch (locale.value as Locales) {
      case 'en': {
        return 'ja'
      }

      case 'ja': {
        return 'en'
      }

      default: {
        return 'ja'
      }
    }
  })

  return {
    localePath,
    switchedLocale
  }
}

export { useLocalePath }
