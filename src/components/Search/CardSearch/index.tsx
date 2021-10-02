import { ProgressCircle } from '@/components/ProgressCircle/ProgressCircle'
import loadable from '@loadable/component'
import delay from 'p-min-delay'
import { memo, useContext, useMemo } from 'react'
import { useLayoutContext } from '@/layouts/hooks'
import { useTouches, useTouchUtility } from '@/hooks/touch'
import { isUndefined } from '@/utils/is'
import { ContextTouches } from '@/components/AccentColor/context'
import Context from '@/components/Search/context'
import GlobalDialog from '@/components/Dialog/GlobalDialog'
const Overlay = loadable(() => import('@/components/Overlay'))

import type { Maybe } from '@/types/generics'
import type { FC } from 'react'

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

const Memo = memo(() => {
  const { locale } = useLayoutContext()
  const [_, { off }] = useContext(Context)

  return (
    <GlobalDialog
      enter="transition duration-500 transform"
      enterFrom="md:opacity-0 translate-y-full md:translate-y-10"
      leave="transition duration-500 transform"
      leaveTo="md:opacity-0 translate-y-full md:translate-y-10"
      onHide={off}
    >
      <Search locale={locale} />
    </GlobalDialog>
  )
})

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
        <Memo />
      </ContextTouches.Provider>
    </Overlay>
  )
}

export default Index
