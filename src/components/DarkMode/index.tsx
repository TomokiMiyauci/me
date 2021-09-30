import { useDarkMode } from '@/hooks/dark_mode'
import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'
import Tooltip from '@/components/Tooltip'
import type { FC } from 'react'

const DarkMode: FC = () => {
  const { value, toggle } = useDarkMode()

  return (
    <Tooltip title="Dark mode">
      <button
        aria-label="Switch dark mode"
        className="text-accent btn-circle transition-colors duration-300"
        onClick={toggle}
      >
        {value ? (
          <IconSkeltonLoader
            className="w-8 h-8"
            fallbackClassName="rounded-full"
            icon={() => import('@iconify/icons-bx/bx-moon')}
          />
        ) : (
          <IconSkeltonLoader
            className="w-8 h-8"
            fallbackClassName="rounded-full"
            icon={() => import('@iconify/icons-jam/sun')}
          />
        )}
      </button>
    </Tooltip>
  )
}

export default DarkMode
