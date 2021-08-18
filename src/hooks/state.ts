import { useState } from 'react'
import type { AnyFn } from 'fonction'

const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, changeState] = useState<boolean>(initialState)
  const toggle = (): void => changeState(!state)

  return [state, toggle] as [boolean, typeof toggle]
}

const useSequence = () => {
  const [state, changeState] = useState(false)

  const sequence = async <T>(
    fn: AnyFn<any, Promise<T> | T>
  ): Promise<T | void> => {
    if (state) return
    changeState(true)
    try {
      const result = await fn()

      return result
    } finally {
      changeState(false)
    }
  }

  return [state, sequence] as const
}

export { useToggle, useSequence }
