import { useMemo, useContext } from 'react'
import { useTouches } from '@/hooks/touch'
import Context, { ContextTouches } from '@/components/AccentColor/context'
import { isUndefined } from '@/utils/is'
import { Transition } from '@headlessui/react'
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet'
const CardAccentColor = loadable(
  () => import('@/components/AccentColor/CardAccentColor/CardAccentColor')
)
const PortalBody = loadable(() => import('@/components/Portal/PortalBody'))

import type { FC } from 'react'

const Index: FC = () => {
  const [isShow, { off: hideDialog }] = useContext(Context)
  const touches = useTouches()

  const startPositionY = useMemo(
    () => touches.touchStart[0]?.pageY,
    [touches.touchStart[0]]
  )
  const movePositionY = useMemo(
    () => touches.touchMove[0]?.pageY,
    [touches.touchMove[0]]
  )

  const diff = useMemo(() => {
    if (isUndefined(startPositionY) || isUndefined(movePositionY)) return
    return movePositionY - startPositionY
  }, [startPositionY, movePositionY])

  const ratio = useMemo<number | undefined>(() => {
    if (isUndefined(touches.touchMove[0]) || isUndefined(diff)) return undefined
    if (touches.touchMove[0].pageY > window.innerHeight) return 0

    return 1 - touches.touchMove[0].pageY / window.innerHeight
  }, [touches.touchMove[0], diff])
  const blurPx = useMemo<string | undefined>(
    () =>
      isUndefined(ratio)
        ? undefined
        : `blur(${Number(12 * ratio).toFixed(1)}px)`,
    [ratio]
  )

  return (
    <PortalBody>
      <Transition
        show={isShow}
        enter="transition duration-1000"
        enterFrom="backdrop-opacity-0"
        leave="transition duration-1000"
        leaveTo="backdrop-opacity-0"
        onClick={hideDialog}
        className="backdrop-blur-md fixed inset-0 cursor-pointer p-4 md:p-40"
        style={{
          backdropFilter: blurPx
        }}
      >
        <Helmet bodyAttributes={{ 'data-fullscreen': 'true' }} />

        <ContextTouches.Provider value={touches}>
          <CardAccentColor />
        </ContextTouches.Provider>
      </Transition>
    </PortalBody>
  )
}

export default Index
