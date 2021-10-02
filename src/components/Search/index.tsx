import { useHash } from '@/hooks/hash'
import SearchButton from '@/components/Search/SearchButton'
import Context from '@/components/Search/context'
import loadable from '@loadable/component'

const CardSearch = loadable(() => import('@/components/Search/CardSearch'))
import type { FC } from 'react'

const Index: FC = () => {
  const [isShow, changeHash] = useHash('#search')

  const changeShow = {
    on: (): void => changeHash(true),
    off: (): void => changeHash(false)
  }

  return (
    <Context.Provider value={[isShow, changeShow]}>
      <SearchButton />

      <CardSearch />
    </Context.Provider>
  )
}
export default Index
