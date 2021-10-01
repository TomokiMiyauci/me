import { useDarkMode } from '@/hooks/dark_mode'
import IconSkeltonLoader from '@/components/Icon/IconSkeltonLoader'
import Tooltip from '@/components/Tooltip'
import { useShortcut } from '@/hooks/event_listener'
import type { FC } from 'react'

const DarkMode: FC = () => {
  const { value, toggle } = useDarkMode()
  useShortcut(
    {
      metaKey: true,
      code: 'KeyM'
    },
    toggle,
    [value]
  )

  return (
    <Tooltip title="Dark mode ⌘M">
      <button
        aria-label="Switch dark mode"
        className="btn-circle transition-colors duration-300"
        onClick={toggle}
      >
        {value ? (
          <IconSkeltonLoader
            className="w-8 h-8"
            fallbackClassName="rounded-full"
            icon={() => import('@iconify/icons-bx/bx-moon')}
            iconClassName="text-accent"
          />
        ) : (
          <IconSkeltonLoader
            className="w-8 h-8"
            fallbackClassName="rounded-full"
            icon={() => import('@iconify/icons-jam/sun')}
            iconClassName="text-accent"
          />
        )}
      </button>
    </Tooltip>
  )
}

export default DarkMode
