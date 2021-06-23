import React, { FC, useState } from 'react'
import invertColors from '@iconify-icons/mdi/invert-colors'
import { Icon } from '@iconify/react'
import { useAccentColor } from '../utils/use_accent_color'
import { Transition } from '@headlessui/react'

const AccentColor: FC = () => {
  const { switchColor, colorPalette } = useAccentColor()
  const [isShow, changeShow] = useState(false)

  return (
    <div className="relative flex">
      <button
        title="Accent color"
        className="flex"
        onClick={() => changeShow(!isShow)}
      >
        <Icon className="w-8 h-8 text-accent" icon={invertColors} />
      </button>

      <Transition
        show={isShow}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed md:absolute md:space-y-2 top-14 md:top-10 md:bottom-auto md:flex-col md:w-auto items-center md:rounded-md justify-around bg-gray-50 dark:bg-blue-gray-900 md:dark:bg-blue-gray-800 md:bg-gray-100 p-2 flex md:right-0 left-0 w-full">
          {colorPalette.map(({ label, color }) => (
            <button
              title={label}
              onClick={() => {
                switchColor({ label, color })
                changeShow(false)
              }}
              key={label}
              className="w-6 h-6 hover:scale-[1.2] transform duration-200  transition-transform rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </Transition>
    </div>
  )
}

export default AccentColor
