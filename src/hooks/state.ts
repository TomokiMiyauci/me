import { useState, useMemo } from 'react'

const useSwitch = (
  initialState?: boolean | (() => boolean)
): [boolean, { on: () => void; off: () => void }] => {
  const [state, changeState] = useState<boolean>(initialState ?? false)
  const on = (): void => changeState(true)
  const off = (): void => changeState(false)

  return [state, { on, off }]
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

export { usePromiseState, useSwitch }
