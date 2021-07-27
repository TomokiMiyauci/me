import blogicon from '@iconify-icons/carbon/blog'
import accountIcon from '@iconify-icons/mdi/account-outline'
import camera from '@iconify-icons/mdi/camera-outline'
import rss from '@iconify-icons/bi/rss'

type Navi = {
  title: string
  to: string
  icon: object
  className?: string
}

const navigations: Navi[] = [
  { title: 'About', to: '/', icon: accountIcon },
  { title: 'Blog', to: '/posts/', icon: blogicon },
  { title: 'Photo', to: '/photos/', icon: camera },
  { title: 'RSS', to: '/rss.xml', icon: rss, className: 'hidden md:list-item' }
]

export { navigations }
export type { Navi }
