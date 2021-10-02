import { useMemo, useEffect, useContext } from 'react'
import { Transition } from '@headlessui/react'
import Context, { ContextTouches } from '@/components/AccentColor/context'
import { useTouchUtility } from '@/hooks/touch'

import CardDialog from '@/components/Card/CardDialog'
import delay from 'p-min-delay'
import { isUndefined } from '@/utils/is'
import { unit } from '@/utils/style'
import { classNames } from '@/utils/class_name'
import loadable from '@loadable/component'
import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'
import type { Maybe } from '@/types/generics'

const AccentColor = loadable(
  () => delay(import('@/components/AccentColor/AccentColor'), 1000),
  {
    fallback: (
      <div className="h-full grid place-items-center">
        <ProgressCircle />
      </div>
    )
  }
)

const CardAccentColor = () => {
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
      enter="transition duration-500 transform"
      enterFrom="md:opacity-0 translate-y-full md:translate-y-0 md:-translate-x-10"
      leave="transition duration-500 transform"
      leaveTo="md:opacity-0 translate-y-full md:translate-y-0 md:-translate-x-10"
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
        <AccentColor />
      </CardDialog>
    </Transition.Child>
  )
}

export default CardAccentColor
