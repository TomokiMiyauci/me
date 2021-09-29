import Esc from '@/components/Esc/Esc'
import { useEffect } from 'react'
import { makeEventListenerPair } from '@/utils/evnet_listener'
import type { FC } from 'react'

const useKeydown = (handler: (ev: globalThis.KeyboardEvent) => void) => {
  const { register, unregister } = makeEventListenerPair(
    window,
    'keydown',
    handler
  )
  useEffect(() => {
    register()

    return unregister
  }, [])
}

const Index: FC<
  JSX.IntrinsicElements['button'] & {
    onKeyDownEscape?: (ev: globalThis.KeyboardEvent) => void
  }
> = ({ onKeyDownEscape, ...props }) => {
  useKeydown((ev) => {
    if (ev.code !== 'Escape') return
    onKeyDownEscape?.(ev)
  })
  return (
    <span
      className="tooltip hidden md:block"
      data-tooltip="Close on keydown escape"
    >
      <Esc {...props} />
    </span>
  )
}

export default Index
