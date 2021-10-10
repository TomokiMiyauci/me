import { useMemo } from 'react'
import { useHashState } from 'react-hookable'

const useIsHashState = (value: string) => {
  const [hash, setHash] = useHashState(undefined, { hashMark: false })

  const isHash = useMemo<boolean>(() => hash === value, [hash])
  const changeHash = (val: boolean) => {
    if (val) {
      setHash(value)
    } else {
      setHash('')
    }
  }
  const on = () => changeHash(true)
  const off = () => changeHash(false)

  return [isHash, { on, off }] as const
}

export { useIsHashState }
