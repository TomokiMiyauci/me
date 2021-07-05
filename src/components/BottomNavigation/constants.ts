import blogicon from '@iconify-icons/carbon/blog'
import accountIcon from '@iconify-icons/mdi/account-outline'
import camera from '@iconify-icons/mdi/camera'

type Navi = {
  title: string
  to: string
  icon: object
}

const navigations: Navi[] = [
  { title: 'About', to: '/', icon: accountIcon },
  { title: 'Blog', to: '/posts/', icon: blogicon },
  { title: 'Photo', to: '/photos/', icon: camera }
]

export { navigations }
export type { Navi }
