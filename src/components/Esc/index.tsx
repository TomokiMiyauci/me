import loadable from '@loadable/component'
import delay from 'p-min-delay'
import SkeltonLoader from '@/components/SkeltonLoader/SkeltonLoader'
const Esc = loadable(() => delay(import('@/components/Esc/Esc'), 1000), {
  ssr: false,
  fallback: (
    <SkeltonLoader className="border dark:border-blue-gray-700 inline-block align-middle w-[35.53px] h-[26px] rounded-md" />
  )
})
import Tooltip from '@/components/Tooltip'
import { useEventListener } from '@/hooks/event_listener'
import type { FC } from 'react'

const Index: FC<
  JSX.IntrinsicElements['button'] & {
    onKeyDownEscape?: (ev: globalThis.KeyboardEvent) => void
  }
> = ({ onKeyDownEscape, ...props }) => {
  useEventListener('keydown', (ev) => {
    if (ev.code !== 'Escape') return
    onKeyDownEscape?.(ev)
  })

  return (
    <Tooltip title="Close on keydown escape">
      <Esc {...props} />
    </Tooltip>
  )
}

export default Index
