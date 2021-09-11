import { useState, useMemo } from 'react'
import type { Touch } from 'react'

const useSwipe = () => {
  const [initState, changeInitState] = useState<number | undefined>(undefined)
  const [midState, changeMidState] = useState<number | undefined>(undefined)
  const [touch, changeTouch] = useState<Touch>()

  const diff = useMemo<number>(() => {
    if (!!initState && !!midState) {
      return midState - initState
    }

    return 0
  }, [initState, midState])

  const translate = useMemo<{ transform?: string }>(() => {
    if (!diff) return {}

    return {
      transform: `translateY(${diff.toFixed(2)}px)`
    }
  }, [diff])

  const reset = (): void => {
    changeInitState(undefined)
    changeMidState(undefined)
    changeTouch(undefined)
  }

  return {
    changeInitState,
    changeMidState,
    changeTouch,
    diff,
    translate,
    touch,
    reset
  }
}

export { useSwipe }
