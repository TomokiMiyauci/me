type Navi = {
  title: string
  to: string
  icon: string
}

const navigations: Navi[] = [
  { title: 'About', to: '/', icon: 'mdi:account-outline' },
  { title: 'Blog', to: '/posts/', icon: 'carbon:blog' },
  { title: 'Photo', to: '/photos/', icon: 'mdi:camera-outline' }
]

export { navigations }
export type { Navi }
