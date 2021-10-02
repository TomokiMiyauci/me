import { useMemo, useContext } from 'react'
import { useTouches, useTouchUtility } from '@/hooks/touch'
import Context, { ContextTouches } from '@/components/AccentColor/context'
import { isUndefined } from '@/utils/is'
import loadable from '@loadable/component'
import type { FC } from 'react'
import type { Maybe } from '@/types/generics'

const CardAccentColor = loadable(
  () => import('@/components/AccentColor/CardAccentColor/CardAccentColor')
)

const Overlay = loadable(() => import('@/components/Overlay'))

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
    <Overlay
      show={isShow}
      onClick={hideDialog}
      style={{
        backdropFilter: blurPx
      }}
    >
      <ContextTouches.Provider value={touches}>
        <CardAccentColor />
      </ContextTouches.Provider>
    </Overlay>
  )
}

export default Index
