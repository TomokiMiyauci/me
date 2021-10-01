import ButtonAccentColor from '@/components/AccentColor/ButtonAccentColor'
import Context from '@/components/AccentColor/context'
import { useSwitch } from '@/hooks/state'
import loadable from '@loadable/component'
const CardAccentColor = loadable(
  () => import('@/components/AccentColor/CardAccentColor')
)

import type { FC } from 'react'

const Index: FC = () => {
  const accentColorState = useSwitch()

  return (
    <Context.Provider value={accentColorState}>
      <ButtonAccentColor />

      <CardAccentColor />
    </Context.Provider>
  )
}

export default Index
