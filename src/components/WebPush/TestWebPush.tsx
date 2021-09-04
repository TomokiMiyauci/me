import { defineComponent } from '@/utils/component'
import { classNames } from '@/utils/class_name'
import { useIsSupported } from '@/components/WebPush/hooks'
import { useMemo } from 'react'
import { useSequence } from '@/hooks/state'
import { Icon } from '@iconify/react/dist/offline'
import cancel from '@iconify-icons/mdi/cancel'
import testIcon from '@iconify/icons-grommet-icons/test'
import type { MouseEventHandler } from 'react'

const TestWebPush = defineComponent<{
  onForeground: () => Promise<unknown> | unknown
  onBackground: () => Promise<unknown> | unknown
}>(({ className, onForeground, onBackground }) => {
  const { isPending: isPendingSupported, isRejected } = useIsSupported()
  const [isExecuting, sequence] = useSequence()

  const isPending = useMemo<boolean>(
    () => isPendingSupported || isExecuting,
    [isPendingSupported, isExecuting]
  )
  const placeholder = useMemo(() => {
    if (isPendingSupported || isPending) return '...Loading'
    if (isRejected)
      return (
        <span className="space-x-2">
          <Icon className="w-6 h-6" icon={cancel} />
          <span className="align-middle">background</span>
        </span>
      )

    return 'background'
  }, [isPendingSupported, isPending, isRejected])

  const handleClick: MouseEventHandler = () => sequence(onBackground)

  const baseClassName =
    'rounded-md p-2 flex-1 hover:bg-opacity-80 font-bold uppercase focus:ring transition duration-300 ring-gray-50 disabled:opacity-70 disabled:cursor-not-allowed'

  return (
    <div className={classNames(className)}>
      <h4 className="space-x-2">
        <Icon className="animate-bounce" icon={testIcon} />
        <span className="align-middle">Test</span>
      </h4>

      <p className="text-gray-400">You can try it</p>

      <section className="flex my-3 space-x-4">
        <button
          onClick={onForeground}
          className={classNames(baseClassName, 'bg-teal-500')}
        >
          foreground
        </button>
        <button
          disabled={isPending}
          onClick={handleClick}
          className={classNames(baseClassName, 'bg-fuchsia-500')}
        >
          {placeholder}
        </button>
      </section>
    </div>
  )
})

export default TestWebPush
