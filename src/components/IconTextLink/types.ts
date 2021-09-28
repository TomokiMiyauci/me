import type { IconifyIcon } from '@iconify/react'
type Navi = {
  title: string
  to: string
  icon: () => Promise<{ default: IconifyIcon }>
  isActive: boolean
}

export type { Navi }
