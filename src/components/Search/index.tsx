import { useSearchShow } from '@/components/Search/hooks'
import Overlay from '@/components/Overlay'
import loadable from '@loadable/component'
import type { FC } from 'react'
const Search = loadable(() => import('@/components/Search/Search'))

const Index: FC = () => {
  const [searchShow, toggleSearch] = useSearchShow()

  return (
    <Overlay
      enter="transition transform duration-500"
      enterFrom="opacity-0 translate-y-full md:translate-y-10"
      leave="transition transform duration-500"
      leaveTo="translate-y-full md:opacity-0 md:translate-y-10"
      show={searchShow}
      className="inset-0 p-4 md:p-40 fixed backdrop-blur backdrop-filter cursor-pointer"
      onClick={(e: Event) => {
        e.stopPropagation()
        if (e.target) {
          const result = (e.target as Element).getAttribute('data-fullscreen')
          if (result === 'true') {
            toggleSearch()
          }
        }
      }}
      data-fullscreen="true"
    >
      <Search />
    </Overlay>
  )
}
export default Index
