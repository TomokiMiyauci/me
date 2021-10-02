import { useMemo, useContext } from 'react'
import { useTouches, useTouchUtility } from '@/hooks/touch'
import Context, { ContextTouches } from '@/components/AccentColor/context'
import { isUndefined } from '@/utils/is'
import { Transition } from '@headlessui/react'
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet'
import type { FC } from 'react'
import type { Maybe } from '@/types/generics'

const CardAccentColor = loadable(
  () => import('@/components/AccentColor/CardAccentColor/CardAccentColor')
)
const PortalBody = loadable(() => import('@/components/Portal/PortalBody'))

const Index: FC = () => {
  const [isShow, { off: hideDialog }] = useContext(Context)
  const touches = useTouches()
  const { movePageY } = useTouchUtility(touches)

  const ratio = useMemo<Maybe<number>>(() => {
    if (isUndefined(movePageY)) return undefined
    if (movePageY > window.innerHeight) return 0

    return 1 - movePageY / window.innerHeight
  }, [movePageY])

  const blurPx = useMemo<Maybe<string>>(
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
