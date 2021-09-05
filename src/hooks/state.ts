import { useState, useMemo } from 'react'
import { wait } from '@/utils/time'
import type { AnyFn } from 'fonction'

const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, changeState] = useState<boolean>(initialState)
  const toggle = (): void => changeState(!state)

  return [state, toggle] as [boolean, typeof toggle]
}

const useSequence = () => {
  const [state, changeState] = useState(false)

  const sequence = async <T>(
    fn: AnyFn<any, Promise<T> | T>,
    delay?: number
  ): Promise<T | void> => {
    if (state) return
    changeState(true)
    try {
      const result = await fn()

      return result
    } finally {
      if (delay) {
        await wait(delay)
      }
      changeState(false)
    }
  }

  return [state, sequence] as const
}

type State = 'pending' | 'rejected' | 'fulfilled'
const usePromiseState = () => {
  const [state, changeState] = useState<State>('pending')

  const isPending = useMemo<boolean>(() => state === 'pending', [state])
  const isRejected = useMemo<boolean>(() => state === 'rejected', [state])
  const isFulfilled = useMemo<boolean>(() => state === 'fulfilled', [state])

  return {
    isPending,
    isRejected,
    isFulfilled,
    changeState
  }
}

export { useToggle, useSequence, usePromiseState }
