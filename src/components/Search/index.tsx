import SearchCard from '@/components/Search/SearchCard'
import Overlay from '@/components/Overlay'
import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'
import loadable from '@loadable/component'
import delay from 'p-min-delay'
import { useSearchShow } from '@/components/Search/hooks'
import { memo, useContext, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { SwipeContext } from '@/components/Swipe/Context'
import { useSwipe } from '@/components/Swipe/hooks'
import { classNames } from '@/utils/class_name'
import { useLayoutContext } from '@/layouts/hooks'

import type { FC } from 'react'

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

const Memo = memo(() => {
  const { locale } = useLayoutContext()
  return (
    <>
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r animate-pulse-bit-slow from-purple-500 via-pink-500 to-amber-500 blur-md" />
      <SearchCard className={`h-full relative transition-shadow duration-300`}>
        <Search locale={locale} />
      </SearchCard>
    </>
  )
})

const Inner: FC = () => {
  const { diff, translate, reset } = useContext(SwipeContext)

  useEffect(() => {
    return reset
  }, [])

  return (
    <div
      style={{
        ...translate
      }}
      className={classNames(
        'h-full md:max-h-[600px] relative md:max-w-4xl mx-auto',
        diff === 0 ? 'transition-transform duration-300' : ''
      )}
    >
      <Memo />
    </div>
  )
}

const MemoHelmet = memo(() => (
  <Helmet>
    <body data-fullscreen="true" />
  </Helmet>
))

const Index: FC = () => {
  const [searchShow, changeShow] = useSearchShow()
  const Init = 12
  const { touch, diff, ...rest } = useSwipe()

  const ratio = useMemo(() => {
    if (!touch || diff === 0) return 1
    if (touch.pageY > window.innerHeight) return 0

    return 1 - touch.pageY / window.innerHeight
  }, [touch, diff])

  const backdropFilter = useMemo(() => {
    return {
      backdropFilter: `blur(${Number(Init * ratio).toFixed(2)}px)`
    }
  }, [ratio])

  return (
    <Overlay
      enter="transition transform duration-500"
      enterFrom="opacity-0 translate-y-full md:translate-y-10"
      leave="transition transform duration-500"
      leaveTo="translate-y-full md:opacity-0 md:translate-y-10"
      show={searchShow}
      className="inset-0 p-4 md:p-40 fixed backdrop-blur-md cursor-pointer"
      style={{
        ...backdropFilter
      }}
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
      <MemoHelmet />
      <SwipeContext.Provider value={{ touch, diff, ...rest }}>
        <Inner />
      </SwipeContext.Provider>
    </Overlay>
  )
}
export default Index
