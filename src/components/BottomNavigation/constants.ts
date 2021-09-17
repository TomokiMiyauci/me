import blogicon from '@iconify-icons/carbon/blog'
import accountIcon from '@iconify-icons/mdi/account-outline'
import camera from '@iconify-icons/mdi/camera-outline'
import code from '@iconify-icons/carbon/code'
import chatMultiple16Regular from '@iconify/icons-fluent/chat-multiple-16-regular'
type Navi = {
  title: string
  to: string
  icon: object
}

const navigations: Navi[] = [
  { title: 'About', to: '/', icon: accountIcon },
  { title: 'Blog', to: '/posts/', icon: blogicon },
  { title: 'Project', to: '/projects/', icon: code },
  { title: 'Photo', to: '/photos/', icon: camera },
  { title: 'Beta', to: '/chat/', icon: chatMultiple16Regular }
]

export { navigations }
export type { Navi }
