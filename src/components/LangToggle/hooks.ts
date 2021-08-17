import { Locale } from '@/../config/types'
import { useMemo, useState } from 'react'
import { useLocalization } from 'gatsby-theme-i18n'

const useToggleLang = (initState?: Locale) => {
  const { locale } = useLocalization()
  const _initLocale = initState ?? (locale as Locale)
  const [enabled, setEnabled] = useState(_initLocale === 'ja')

  const lang = useMemo<Locale>(() => (enabled ? 'ja' : 'en'), [enabled])

  return [lang, enabled, setEnabled] as const
}

export { useToggleLang }
