import { Locale } from '@/../config/types'
import { useMemo, useState } from 'react'

const useToggleLang = (initState?: Locale) => {
  const _initLocale = initState
  const [enabled, setEnabled] = useState(_initLocale === 'ja')

  const lang = useMemo<Locale>(() => (enabled ? 'ja' : 'en'), [enabled])

  return [lang, enabled, setEnabled] as const
}

export { useToggleLang }
