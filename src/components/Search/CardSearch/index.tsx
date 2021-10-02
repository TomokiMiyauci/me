import CardDialog from '@/components/Card/CardDialog'
import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'
import loadable from '@loadable/component'
import delay from 'p-min-delay'
import { memo, useContext, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { classNames } from '@/utils/class_name'
import { useLayoutContext } from '@/layouts/hooks'
import { Transition } from '@headlessui/react'
import { useTouches, useTouchUtility } from '@/hooks/touch'
import { isUndefined } from '@/utils/is'
import { ContextTouches } from '@/components/AccentColor/context'
import Context from '@/components/Search/context'
import { unit } from '@/utils/style'
const Overlay = loadable(() => import('@/components/Overlay'))

import type { Maybe } from '@/types/generics'
import type { FC } from 'react'

const PortalBody = loadable(() => import('@/components/Portal/PortalBody'))

const Search = loadable(
  () => delay(import('@/components/Search/Search'), 500),
  {
    fallback: (
      <div className="h-full grid place-items-center">
        <ProgressCircle />
      </div>
    )
  }
)

const MemoHelmet = memo(() => (
  <Helmet
    bodyAttributes={{
      'data-fullscreen': 'true'
    }}
  />
))

const Memo = memo(() => {
  const { locale } = useLayoutContext()
  return <Search locale={locale} />
})

const Inner = () => {
  const touches = useContext(ContextTouches)
  const { diff } = useTouchUtility(touches)
  const [_, { off: hideDialog }] = useContext(Context)

  const translateY = useMemo<Maybe<string>>(() => {
    if (isUndefined(diff.y)) return
    return `translateY(${unit(diff.y.toFixed(1), 'px')})`
  }, [diff.y])

  useEffect(() => {
    if (typeof diff.y === 'number' && diff.y > 30) {
      touches.touchMove[1](undefined)
      hideDialog()
    } else {
      touches.touchStart[1](undefined)
      touches.touchMove[1](undefined)
      setTimeout(() => {
        touches.touchEnd[1](undefined)
      }, 300)
    }
  }, [touches.touchEnd[0]])

  useEffect(() => {
    return () => {
      touches.touchStart[1](undefined)
      touches.touchMove[1](undefined)
      touches.touchEnd[1](undefined)
    }
  }, [])

  const className = useMemo<Maybe<string>>(
    () =>
      touches.touchEnd[0] ? 'transition-transform duration-300' : undefined,
    [touches.touchEnd[0]]
  )

  return (
    <Transition.Child
      enter="transition duration-700 transform"
      enterFrom="md:opacity-0 translate-y-full md:translate-y-10"
      leave="transition duration-700 transform"
      leaveTo="md:opacity-0 translate-y-full md:translate-y-10"
      onClick={(ev) => {
        ev.stopPropagation()
      }}
      role="dialog"
      className={classNames(
        'h-full w-full md:max-h-[600px] md:max-w-4xl relative cursor-auto mx-auto',
        className
      )}
      style={{
        transform: translateY
      }}
    >
      <CardDialog className="h-full flex flex-col">
        <Memo />
      </CardDialog>
    </Transition.Child>
  )
}

const Index: FC = () => {
  const [isShow, changeShow] = useContext(Context)
  const touches = useTouches()
  const { movePageY } = useTouchUtility(touches)

  const ratio = useMemo<Maybe<number>>(() => {
    if (isUndefined(movePageY)) return undefined
    if (movePageY > window.innerHeight) return 0

    return 1 - movePageY / window.innerHeight
  }, [movePageY])

  const blur = useMemo<Maybe<string>>(
    () =>
      isUndefined(ratio)
        ? undefined
        : `blur(${Number(12 * ratio).toFixed(1)}px)`,
    [ratio]
  )

  return (
    <Overlay
      show={isShow}
      onClick={changeShow.off}
      className="backdrop-blur-md fixed inset-0 cursor-pointer p-4 md:p-40"
      style={{
        backdropFilter: blur
      }}
    >
      <ContextTouches.Provider value={touches}>
        <Inner />
      </ContextTouches.Provider>
    </Overlay>
  )
}

export default Index
