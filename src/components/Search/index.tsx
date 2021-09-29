import CardDialog from '@/components/Card/CardDialog'
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
import { Transition } from '@headlessui/react'

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
    <CardDialog className="flex flex-col justify-center cursor-auto h-full">
      <Search locale={locale} />
    </CardDialog>
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
    <Transition
      enter="transition transform duration-500"
      enterFrom="opacity-0 translate-y-full md:translate-y-10"
      leave="transition transform duration-500"
      leaveTo="translate-y-full md:opacity-0 md:translate-y-10"
      show={searchShow}
      className="inset-0 fixed p-4 md:p-40 backdrop-blur-md cursor-pointer"
      style={{
        ...backdropFilter
      }}
      onClick={(e: any) => {
        const ev = e as Event
        ev.stopPropagation()
        if (e.target) {
          const result = (ev.target as Element).getAttribute('data-fullscreen')
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
    </Transition>
  )
}
export default Index
