import { defineComponent } from '@/utils/component'
import { classNames } from '@/utils/class_name'

const TestWebPush = defineComponent<{
  onForeground: () => Promise<unknown> | unknown
  onBackground: () => Promise<unknown> | unknown
}>(({ className, onForeground, onBackground }) => {
  const Buttons: {
    colorClass: string
    onClick: () => Promise<unknown> | unknown
    title: string
  }[] = [
    {
      colorClass: 'bg-teal-500',
      onClick: onForeground,
      title: 'forground'
    },
    {
      colorClass: 'bg-sky-500',
      onClick: onBackground,
      title: 'background'
    }
  ]

  return (
    <div className={classNames(className)}>
      <h4>Test</h4>

      <p className="text-gray-400">You can try it</p>

      <section className="flex my-3 space-x-4">
        {Buttons.map(({ onClick, title, colorClass }) => {
          return (
            <button
              className={classNames(
                colorClass,
                'rounded-md p-2 flex-1 hover:bg-opacity-80 font-bold uppercase focus:ring transition duration-300 ring-gray-50'
              )}
              onClick={onClick}
            >
              {title}
            </button>
          )
        })}
      </section>
    </div>
  )
})

export default TestWebPush
