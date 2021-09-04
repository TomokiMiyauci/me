import { defineComponent } from '@/utils/component'
import { classNames } from '@/utils/class_name'
import { useIsSupported } from '@/components/WebPush/hooks'
import { useMemo } from 'react'
import { Icon } from '@iconify/react/dist/offline'
import cancel from '@iconify-icons/mdi/cancel'

const TestWebPush = defineComponent<{
  onForeground: () => Promise<unknown> | unknown
  onBackground: () => Promise<unknown> | unknown
}>(({ className, onForeground, onBackground }) => {
  const { isPending, isRejected, isFulfilled } = useIsSupported()

  const placeholder = useMemo(() => {
    if (isPending) return '...Loading'
    if (isRejected)
      return (
        <span className="space-x-2">
          <Icon className="w-6 h-6" icon={cancel} />
          <span className="align-middle">background</span>
        </span>
      )

    return 'background'
  }, [isPending, isRejected])

  const baseClassName =
    'rounded-md p-2 flex-1 hover:bg-opacity-80 font-bold uppercase focus:ring transition duration-300 ring-gray-50 disabled:opacity-70 disabled:cursor-not-allowed'

  return (
    <div className={classNames(className)}>
      <h4>Test</h4>

      <p className="text-gray-400">You can try it</p>

      <section className="flex my-3 space-x-4">
        <button
          onClick={onForeground}
          className={classNames(baseClassName, 'bg-teal-500')}
        >
          forground
        </button>
        <button
          disabled={!isFulfilled}
          onClick={onBackground}
          className={classNames(baseClassName, 'bg-fuchsia-500')}
        >
          {placeholder}
        </button>
      </section>
    </div>
  )
})

export default TestWebPush
