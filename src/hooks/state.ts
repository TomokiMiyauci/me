import { useState, useMemo } from 'react'
import { wait } from '@/utils/time'
import type { AnyFn } from 'fonction'

/**
 * Hooks for `boolean` toggle.
 * @param initialState - Initial state for toggle
 * @returns A stateful value, and a toggle function to update it.
 *
 * @example
 * ```ts
 * const [state, toggle] = useToggle(false)
 * state // false
 * toggle()
 * state // true
 * toggle()
 * state // false
 * ```
 */
const useToggle = (
  initialState: boolean | (() => boolean)
): [boolean, () => void] => {
  const [state, changeState] = useState<boolean>(initialState)
  const toggle = (): void => changeState(!state)

  return [state, toggle]
}

/**
 * Hooks for sequential function
 * @param initState - Initial state for sequence
 * @returns A stateful value, and a sequential call wrapper function
 *
 * @example
 * ```ts
 * const [isPending, sequence] = useSequence()
 * isPending // false
 * sequence(async () => await wait(200))
 * isPending // true
 *
 * before 200sec
 * sequence(() => {}) // not call
 *
 * after 200sec
 * isPending // true
 * sequence(() => {}) // call
 * ```
 */
const useSequence = (initState?: boolean | (() => boolean)) => {
  const [state, changeState] = useState<boolean>(initState ?? false)

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
