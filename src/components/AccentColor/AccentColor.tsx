import CardDialog from '@/components/Card/CardDialog'
import Esc from '@/components/Esc'
import Tooltip from '@/components/Tooltip'
import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'
import Context from '@/components/AccentColor/context'

import { useAccentColor } from '@/utils/use_accent_color'
import { useContext } from 'react'
import type { FC } from 'react'

const AccentColor: FC = () => {
  const { switchColor, colorPalette } = useAccentColor()
  const [_, changeShow] = useContext(Context)

  return (
    <CardDialog className="h-full flex flex-col">
      <header className="p-2 flex items-center justify-between">
        <span className="space-x-2">
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
          <h2 className="inline align-middle text-2xl">Accent color</h2>
        </span>

        <Esc
          onKeyDownEscape={() => changeShow(false)}
          onClick={() => changeShow(false)}
        />
      </header>

      <hr className="border-gray-200 dark:border-blue-gray-700" />

      <section className="flex-1 grid grid-cols-2 md:grid-cols-3 place-items-center">
        {colorPalette.map(({ label, color }) => (
          <div key={label} className="text-center">
            <button
              title={label}
              onClick={() => {
                switchColor({ label, color })
                changeShow(false)
              }}
              aria-label={`Switch accent color to ${label}`}
              className="hover:scale-[1.2] transform duration-500 w-20 h-20 md:w-24 md:h-24 animate-pulse-bit-slow transition-transform rounded-full"
              style={{ backgroundColor: color }}
            />

            <h3 className="capitalize text-lg font-bold" style={{ color }}>
              {label}
            </h3>
          </div>
        ))}
      </section>
    </CardDialog>
  )
}

export default AccentColor
