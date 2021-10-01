import Esc from '@/components/Esc'
import Tooltip from '@/components/Tooltip'
import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'
import Context from '@/components/AccentColor/context'
import { Transition } from '@headlessui/react'
import { useAccentColor } from '@/utils/use_accent_color'
import { useContext } from 'react'
import { classNames } from '@/utils/class_name'
import type { FC } from 'react'

const delayMap: Record<number, string> = {
  0: 'delay-100',
  1: 'delay-300',
  2: 'delay-500',
  3: 'delay-700',
  4: 'delay-[900ms]',
  5: 'delay-[1100ms]',
  6: 'delay-[1300ms]'
}

const AccentColor: FC = () => {
  const { switchColor, colorPalette } = useAccentColor()
  const [_, changeShow] = useContext(Context)

  return (
    <>
      <header className="p-2 flex items-center justify-between">
        <span className="space-x-4">
          <Tooltip title="Close">
            <button
              className="btn-circle hover:text-accent transition-colors duration-300"
              onClick={() => changeShow(false)}
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

        <Esc
          onKeyDownEscape={() => changeShow(false)}
          onClick={() => changeShow(false)}
        />
      </header>

      <hr className="border-gray-200 dark:border-blue-gray-700" />

      <section className="flex-1 grid grid-cols-2 md:grid-cols-3 place-items-center">
        {colorPalette.map(({ label, color }, i) => (
          <Transition
            enterFrom="scale-0"
            enter={classNames('transition-transform duration-500', delayMap[i])}
            appear
            show
            key={label}
            className="text-center"
          >
            <button
              title={label}
              onClick={() => {
                switchColor({ label, color })
                changeShow(false)
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
        ))}
      </section>
    </>
  )
}

export default AccentColor
