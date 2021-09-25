import { Icon } from '@iconify/react/dist/offline'
import twitter from '@iconify-icons/uil/twitter-alt'
import github from '@iconify-icons/uil/github-alt'
import npmOutline from '@iconify-icons/eva/npm-outline'
import type { FC } from 'react'

const Nav: FC = () => {
  return (
    <div className="flex flex-nowrap items-center my-4 text-gray-500 space-x-8 md:space-x-4 lg:space-x-6">
      <a
        href="https://www.npmjs.com/~miyauci"
        rel="noopener"
        target="_blank"
        aria-label="My npm packages"
        className="transition duration-200 hover:text-accent"
      >
        <Icon icon={npmOutline} className="w-8 h-8" />
      </a>

      <a
        href="https://twitter.com/tomoki_miyauci"
        rel="noopener"
        target="_blank"
        aria-label="My twitter account"
        className="transition duration-200 hover:text-accent"
      >
        <Icon icon={twitter} className="w-8 h-8" />
      </a>

      <a
        href="https://github.com/TomokiMiyauci/me"
        rel="noopener"
        target="_blank"
        aria-label="My GitHub account"
        className="transition duration-200 hover:text-accent"
      >
        <Icon icon={github} className="w-8 h-8" />
      </a>
    </div>
  )
}

export default Nav
