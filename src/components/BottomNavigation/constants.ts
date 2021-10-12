import type { IconifyIcon } from '@iconify/react'

type Navi = {
  title: string
  to: string
  icon: () => Promise<{ default: IconifyIcon }>
}

const navigations: Navi[] = [
  {
    title: 'About',
    to: '/',
    icon: () => import('@iconify-icons/mdi/account-outline')
  },
  {
    title: 'Blog',
    to: '/posts/',
    icon: () => import('@iconify-icons/carbon/blog')
  },
  {
    title: 'Project',
    to: '/projects/',
    icon: () => import('@iconify-icons/carbon/code')
  },
  {
    title: 'Photo',
    to: '/photos/',
    icon: () => import('@iconify-icons/mdi/camera-outline')
  }
]

export { navigations }
export type { Navi }
