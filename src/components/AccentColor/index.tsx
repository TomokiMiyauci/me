import ButtonAccentColor from '@/components/AccentColor/ButtonAccentColor'
import Context from '@/components/AccentColor/context'
import loadable from '@loadable/component'
import { useHash } from 'react-hookable'
const CardAccentColor = loadable(
  () => import('@/components/AccentColor/CardAccentColor')
)

import { FC, useMemo } from 'react'

const Index: FC = () => {
  const [hash, setHash] = useHash(undefined, { hashMark: false })
  const changeHash = (val: boolean) => {
    if (val) {
      setHash('accent-color')
    } else {
      setHash('')
    }
  }

  const isHash = useMemo(() => hash === 'accent-color', [hash])

  return (
    <Context.Provider
      value={[
        isHash,
        {
          on: (): void => changeHash(true),
          off: (): void => changeHash(false)
        }
      ]}
    >
      <ButtonAccentColor />

      <CardAccentColor />
    </Context.Provider>
  )
}

export default Index
