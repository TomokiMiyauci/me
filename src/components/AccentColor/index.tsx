import ButtonAccentColor from '@/components/AccentColor/ButtonAccentColor'
import Context from '@/components/AccentColor/context'
import loadable from '@loadable/component'
import { useIsHashState } from '@/hooks/hash'
const CardAccentColor = loadable(
  () => import('@/components/AccentColor/CardAccentColor')
)

import { FC, useMemo } from 'react'

const Index: FC = () => {
  const [isHash, setHash] = useIsHashState('accent-color')

  return (
    <Context.Provider
      value={[
        isHash,
        {
          on: setHash.on,
          off: setHash.off
        }
      ]}
    >
      <ButtonAccentColor />

      <CardAccentColor />
    </Context.Provider>
  )
}

export default Index
