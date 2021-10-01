import CardDialog from '@/components/Card/CardDialog'
import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'
import loadable from '@loadable/component'
import delay from 'p-min-delay'
import { memo, useContext, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { SwipeContext } from '@/components/Swipe/Context'
import { useSwipe } from '@/components/Swipe/hooks'
import { classNames } from '@/utils/class_name'
import { useLayoutContext } from '@/layouts/hooks'
import { Transition } from '@headlessui/react'
import { useHash } from '@/hooks/hash'
import SearchButton from '@/components/Search/SearchButton'
import Context from '@/components/Search/context'
const PortalBody = loadable(() => import('@/components/Portal/PortalBody'))

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
      onClick={(ev) => ev.stopPropagation()}
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
  <Helmet
    bodyAttributes={{
      'data-fullscreen': 'true'
    }}
  />
))

const Index: FC = () => {
  const [isShow, changeHash] = useHash('#search')

  const changeShow = {
    on: (): void => changeHash(true),
    off: (): void => changeHash(false)
  }
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
    <Context.Provider value={[isShow, changeShow]}>
      <SearchButton />

      <PortalBody>
        <Transition
          enter="transition transform duration-500"
          enterFrom="opacity-0 translate-y-full md:translate-y-10"
          leave="transition transform duration-500"
          leaveTo="translate-y-full md:opacity-0 md:translate-y-10"
          show={isShow}
          className="inset-0 fixed p-4 md:p-40 backdrop-blur-md cursor-pointer"
          style={{
            ...backdropFilter
          }}
          onClick={changeShow.off}
        >
          <MemoHelmet />
          <SwipeContext.Provider value={{ touch, diff, ...rest }}>
            <Inner />
          </SwipeContext.Provider>
        </Transition>
      </PortalBody>
    </Context.Provider>
  )
}
export default Index
