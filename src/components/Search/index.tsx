import { useIsHashState } from '@/hooks/hash'
import SearchButton from '@/components/Search/SearchButton'
import Context from '@/components/Search/context'
import loadable from '@loadable/component'

const CardSearch = loadable(() => import('@/components/Search/CardSearch'))
import type { FC } from 'react'

const Index: FC = () => {
  const [isShow, changeHash] = useIsHashState('search')

  return (
    <Context.Provider
      value={[
        isShow,
        {
          on: changeHash.on,
          off: changeHash.off
        }
      ]}
    >
      <SearchButton />

      <CardSearch />
    </Context.Provider>
  )
}
export default Index
