import Context from '@/components/LangSwitcher/context'
import ButtonLangSwitcher from '@/components/LangSwitcher/ButtonLangSwitcher'
import loadable from '@loadable/component'
import { useHash } from '@/hooks/hash'
import type { FC } from 'react'

const CardLangSwitcher = loadable(
  () => import('@/components/LangSwitcher/CardLangSwitcher')
)

const Index: FC = () => {
  const [isHash, changeHash] = useHash('#language')

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
      <ButtonLangSwitcher />

      <CardLangSwitcher />
    </Context.Provider>
  )
}

export default Index
