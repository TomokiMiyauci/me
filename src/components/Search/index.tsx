import { useSearchShow } from '@/components/Search/hooks'
import Overlay from '@/components/Overlay'
import loadable from '@loadable/component'
import delay from 'p-min-delay'
import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'

import type { FC } from 'react'
import type { Locale } from 'config/types'
const SearchCard = loadable(() => import('@/components/Search/SearchCard'))

const Search = loadable(
  () => delay(import('@/components/Search/Search'), 500),
  {
    fallback: (
      <div className="self-center">
        <ProgressCircle />
      </div>
    )
  }
)

const Index: FC<{ locale: Locale }> = ({ locale }) => {
  const [searchShow, changeShow] = useSearchShow()

  return (
    <Overlay
      enter="transition transform duration-500"
      enterFrom="opacity-0 translate-y-full md:translate-y-10"
      leave="transition transform duration-500"
      leaveTo="translate-y-full md:opacity-0 md:translate-y-10"
      show={searchShow}
      className="inset-0 p-4 md:p-40 fixed backdrop-blur-md cursor-pointer"
      onClick={(e: Event) => {
        e.stopPropagation()
        if (e.target) {
          const result = (e.target as Element).getAttribute('data-fullscreen')
          if (result === 'true') {
            changeShow(false)
          }
        }
      }}
      data-fullscreen="true"
    >
      <SearchCard className="h-full md:max-h-[600px] mx-auto md:max-w-4xl">
        <Search locale={locale} />
      </SearchCard>
    </Overlay>
  )
}
export default Index
