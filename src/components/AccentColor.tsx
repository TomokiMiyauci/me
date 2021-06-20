import React, { FC, useState } from 'react'
import invertColors from '@iconify-icons/mdi/invert-colors'
import { Icon } from '@iconify/react'
import { useAccentColor } from '../utils/use_accent_color'

const AccentColor: FC = () => {
  const { switchColor, colorParet, currentColor } = useAccentColor()
  const [isShow, changeShow] = useState(false)

  return (
    <div className="relative">
      <button title="Accent color" onClick={() => changeShow(!isShow)}>
        <Icon className="w-8 h-8 text-accent" icon={invertColors} />
      </button>

      {isShow && (
        <div className="fixed md:absolute md:space-y-2 bottom-70px md:bottom-auto md:flex-col md:w-auto items-center md:rounded-md justify-around light:bg-gray-50 dark:bg-gray-900 md:dark:bg-gray-800 md:light:bg-gray-100 p-2 flex md:right-0 left-0 w-full">
          {colorParet.map(({ label, color }) => (
            <button
              title={label}
              onClick={() => {
                switchColor({ label, color })
                changeShow(false)
              }}
              key={label}
              className={`w-6 h-6 hover:scale-120 transform duration-200  transition-transform rounded-full ${
                currentColor.label === label
                  ? 'ring ring-opacity-50 light:ring-gray-800 dark:ring-gray-200'
                  : ''
              }
              `}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AccentColor
