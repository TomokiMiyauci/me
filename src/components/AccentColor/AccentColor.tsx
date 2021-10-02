import Esc from '@/components/Esc'
import Tooltip from '@/components/Tooltip'
import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'
import Context from '@/components/AccentColor/context'
import { Transition } from '@headlessui/react'
import { useContext, memo } from 'react'
import { classNames } from '@/utils/class_name'
import type { FC } from 'react'
import Swipe from '@/components/Swipe'
import loadable from '@loadable/component'

const Color = loadable.lib(() => import('@/utils/accent_color'))

const delayMap: Record<number, string> = {
  0: 'delay-100',
  1: 'delay-300',
  2: 'delay-500',
  3: 'delay-700',
  4: 'delay-[900ms]',
  5: 'delay-[1100ms]',
  6: 'delay-[1300ms]'
}

const Memo = memo(Swipe)
const AccentColor: FC = () => {
  const [_, { off: hideDialog }] = useContext(Context)

  return (
    <>
      <Memo />
      <header className="p-2 flex items-center justify-between">
        <span className="space-x-4">
          <Tooltip title="Close">
            <button
              className="btn-circle hover:text-accent transition-colors duration-300"
              onClick={hideDialog}
            >
              <IconSkeltonLoader
                icon={() => import('@iconify-icons/mdi/close')}
                className="w-8 h-8"
                fallbackClassName="rounded-full"
              />
            </button>
          </Tooltip>
          <h2 className="inline align-middle space-x-2 text-2xl">
            <IconSkeltonLoader
              icon={() => import('@iconify/icons-ic/outline-color-lens')}
              className="w-8 h-8"
              fallbackClassName="rounded"
            />
            <span>Accent color</span>
          </h2>
        </span>

        <Esc onKeyDownEscape={hideDialog} onClick={hideDialog} />
      </header>

      <hr className="border-gray-200 dark:border-blue-gray-700" />

      <section className="flex-1 grid grid-cols-2 md:grid-cols-3 place-items-center">
        <Color>
          {({ switchColor, colorPalette }) => {
            return colorPalette.map(({ label, color }, i) => (
              <Transition
                enterFrom="scale-0"
                enter={classNames(
                  'transition-transform duration-500',
                  delayMap[i]
                )}
                appear
                show
                key={label}
                className="text-center"
              >
                <button
                  title={label}
                  onClick={() => {
                    switchColor({ label, color })
                    hideDialog()
                  }}
                  aria-label={`Switch accent color to ${label}`}
                  className="relative hover:scale-[1.2] hover:animate-none transform duration-300 w-20 h-20 md:w-24 md:h-24 animate-pulse-bit-slow transition-transform"
                >
                  <div className="absolute inset-0 blur gradation rounded-full" />
                  <div
                    style={{ backgroundColor: color }}
                    className="relative h-full w-full rounded-full"
                  />
                </button>

                <h3 className="capitalize text-lg font-bold" style={{ color }}>
                  {label}
                </h3>
              </Transition>
            ))
          }}
        </Color>
      </section>
    </>
  )
}

export default memo(AccentColor)
