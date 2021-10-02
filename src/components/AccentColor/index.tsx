import ButtonAccentColor from '@/components/AccentColor/ButtonAccentColor'
import Context from '@/components/AccentColor/context'
import loadable from '@loadable/component'
import { useHash } from '@/hooks/hash'
const CardAccentColor = loadable(
  () => import('@/components/AccentColor/CardAccentColor')
)

import type { FC } from 'react'

const Index: FC = () => {
  const [isHash, changeHash] = useHash('#accent-color')

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
