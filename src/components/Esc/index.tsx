import loadable from '@loadable/component'
import delay from 'p-min-delay'
import SkeltonLoader from '@/components/SkeltonLoader/SkeltonLoader'
import Tooltip from '@/components/Tooltip'
import { useShortcut } from 'react-hookable'
import { useSafeLogEvent } from '@/hooks/firebase/analytics'
import type { FC } from 'react'
const Esc = loadable(() => delay(import('@/components/Esc/Esc'), 1000), {
  ssr: false,
  fallback: (
    <SkeltonLoader className="border dark:border-blue-gray-700 inline-block align-middle w-[35.53px] h-[26px] rounded-md" />
  )
})

const Index: FC<
  JSX.IntrinsicElements['button'] & {
    onKeyDownEscape?: (ev: globalThis.KeyboardEvent) => void
  }
> = ({ onKeyDownEscape, ...props }) => {
  const { safeLogEvent } = useSafeLogEvent()

  useShortcut(
    {
      key: 'Escape'
    },
    (ev) => {
      onKeyDownEscape?.(ev)
      const { code, metaKey, shiftKey, ctrlKey, key, altKey } = ev
      safeLogEvent((analytics, logEvent) =>
        logEvent(analytics, 'shortcut', {
          code,
          metaKey,
          shiftKey,
          ctrlKey,
          key,
          altKey
        })
      )
    }
  )

  return (
    <Tooltip className="hidden md:inline-block" title="Close on keydown escape">
      <Esc {...props} />
    </Tooltip>
  )
}

export default Index
