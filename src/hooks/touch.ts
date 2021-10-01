import { useState } from 'react'
import type { Touch } from 'react'
import type { StateSet } from '@/types/state'

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

export { useTouch, useTouches }
