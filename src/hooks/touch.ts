import { useState, useMemo } from 'react'
import { isUndefined } from '@/utils/is'

import type { Touch } from 'react'
import type { StateSet } from '@/types/state'
import type { Maybe } from '@/types/generics'

const useTouch = (): StateSet<Touch | undefined> => {
  const [touch, setTouch] = useState<Touch>()

  return [touch, setTouch] as StateSet<Touch | undefined>
}

const useTouches = (): {
  touchStart: StateSet<Touch | undefined>
  touchMove: StateSet<Touch | undefined>
  touchEnd: StateSet<Touch | undefined>
} => {
  const touchStart = useTouch()
  const touchMove = useTouch()
  const touchEnd = useTouch()

  return {
    touchStart,
    touchMove,
    touchEnd
  } as const
}

const useTouchUtility = (touches: ReturnType<typeof useTouches>) => {
  const startPageY = useMemo(
    () => touches.touchStart[0]?.pageY,
    [touches.touchStart[0]]
  )
  const movePageY = useMemo(
    () => touches.touchMove[0]?.pageY,
    [touches.touchMove[0]]
  )

  const diffY = useMemo<Maybe<number>>(() => {
    if (isUndefined(startPageY) || isUndefined(movePageY)) return
    return movePageY - startPageY
  }, [startPageY, movePageY])

  const diff = useMemo<{
    y: Maybe<number>
  }>(
    () => ({
      y: diffY
    }),
    [diffY]
  )

  return {
    startPageY,
    movePageY,
    diff
  }
}

export { useTouch, useTouches, useTouchUtility }
