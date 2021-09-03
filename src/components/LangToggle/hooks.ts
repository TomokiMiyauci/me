import { Locale } from '@/../config/types'
import { useMemo, useState } from 'react'

const useToggleLang = (initState?: Locale) => {
  const [enabled, setEnabled] = useState(initState === 'ja')

  const lang = useMemo<Locale>(() => (enabled ? 'ja' : 'en'), [enabled])

  return [lang, enabled, setEnabled] as const
}

export { useToggleLang }
