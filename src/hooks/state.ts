import { useState } from 'react'

const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, changeState] = useState<boolean>(initialState)
  const toggle = (): void => changeState(!state)

  return [state, toggle] as [boolean, typeof toggle]
}

export { useToggle }
