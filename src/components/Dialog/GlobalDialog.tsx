import { useMemo, useEffect, useContext } from 'react'
import { Transition, TransitionClasses } from '@headlessui/react'
import { ContextTouches } from '@/components/AccentColor/context'
import { useTouchUtility } from '@/hooks/touch'

import CardDialog from '@/components/Card/CardDialog'
import { isUndefined } from '@/utils/is'
import { unit } from '@/utils/style'
import { classNames } from '@/utils/class_name'
import type { Maybe } from '@/types/generics'

import type { FC } from 'react'

const GlobalDialog: FC<
  JSX.IntrinsicElements['div'] & { onHide: () => void } & TransitionClasses
> = ({ children, onHide, style, ...props }) => {
  const touches = useContext(ContextTouches)
  const { diff } = useTouchUtility(touches)

  const translateY = useMemo<Maybe<string>>(() => {
    if (isUndefined(diff.y)) return
    return `translateY(${unit(diff.y.toFixed(1), 'px')})`
  }, [diff.y])

  useEffect(() => {
    if (typeof diff.y === 'number' && diff.y > 30) {
      touches.touchMove[1](undefined)
      onHide()
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
      onClick={(ev) => {
        ev.stopPropagation()
      }}
      role="dialog"
      className={classNames(
        'h-full w-full md:max-h-[600px] md:max-w-4xl relative cursor-auto mx-auto',
        className
      )}
      style={{
        transform: translateY,
        ...style
      }}
      {...props}
    >
      <CardDialog className="h-full flex flex-col">{children}</CardDialog>
    </Transition.Child>
  )
}

export default GlobalDialog
