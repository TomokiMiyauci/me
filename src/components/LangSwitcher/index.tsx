import Context from '@/components/LangSwitcher/context'
import ButtonLangSwitcher from '@/components/LangSwitcher/ButtonLangSwitcher'
import loadable from '@loadable/component'
import { useIsHashState } from '@/hooks/hash'
import type { FC } from 'react'

const CardLangSwitcher = loadable(
  () => import('@/components/LangSwitcher/CardLangSwitcher')
)

const Index: FC = () => {
  const [isHash, changeHash] = useIsHashState('language')

  return (
    <Context.Provider
      value={[
        isHash,
        {
          on: changeHash.on,
          off: changeHash.off
        }
      ]}
    >
      <ButtonLangSwitcher />

      <CardLangSwitcher />
    </Context.Provider>
  )
}

export default Index
