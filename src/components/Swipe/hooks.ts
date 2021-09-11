import { useState, useMemo } from 'react'

const useSwipe = () => {
  const [initState, changeInitState] = useState<number | undefined>(undefined)
  const [midState, changeMidState] = useState<number | undefined>(undefined)

  const diff = useMemo<number>(() => {
    if (!!initState && !!midState) {
      return midState - initState
    }

    return 0
  }, [initState, midState])

  const translate = useMemo<{ transform?: string }>(() => {
    if (!diff) return {}

    return {
      transform: `translateY(${diff}px)`
    }
  }, [diff])

  return {
    changeInitState,
    changeMidState,
    diff,
    translate
  }
}

export { useSwipe }
