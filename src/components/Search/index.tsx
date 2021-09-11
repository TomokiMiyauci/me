import SearchCard from '@/components/Search/SearchCard'
import Overlay from '@/components/Overlay'
import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'
import loadable from '@loadable/component'
import delay from 'p-min-delay'
import { useSearchShow } from '@/components/Search/hooks'
import { memo } from 'react'
import { Helmet } from 'react-helmet'
import { SwipeContext } from '@/components/Swipe/Context'
import { useSwipe } from '@/components/Swipe/hooks'
import { classNames } from '@/utils/class_name'

import type { FC } from 'react'
import type { Locale } from 'config/types'

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

const Memo = memo<{
  locale: Locale
}>(({ locale }) => {
  return (
    <>
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r animate-pulse-bit-slow from-purple-500 via-pink-500 to-amber-500 blur-md" />
      <SearchCard className={`h-full relative transition-shadow duration-300`}>
        <Search locale={locale} />
      </SearchCard>
    </>
  )
})

const Inner: FC<{ locale: Locale }> = ({ locale }) => {
  const { diff, translate, ...rest } = useSwipe()

  return (
    <SwipeContext.Provider value={{ diff, translate, ...rest }}>
      <div
        style={{
          ...translate
        }}
        className={classNames(
          'h-full md:max-h-[600px] relative md:max-w-4xl mx-auto',
          diff === 0 ? 'transition-transform duration-300' : ''
        )}
      >
        <Memo locale={locale} />
      </div>
    </SwipeContext.Provider>
  )
}

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
      {searchShow && (
        <Helmet>
          <body data-fullscreen="true" />
        </Helmet>
      )}
      <Inner locale={locale} />
    </Overlay>
  )
}
export default Index
