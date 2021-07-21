import React, { FC } from 'react'
import { Icon } from '@iconify/react/dist/offline'
import firebaseIcon from '@iconify-icons/logos/firebase'
import Logo from './Logo'
import gatsby from '@iconify-icons/logos/gatsby'
import twitter from '@iconify-icons/uil/twitter-alt'
import github from '@iconify-icons/uil/github-alt'
import npmOutline from '@iconify-icons/eva/npm-outline'

const TheFooter: FC = () => {
  return (
    <footer className="px-4 py-4 md:py-12 mb-16 space-y-4 container m-auto md:mb-auto">
      <div className="py-4">
        <span className="space-x-2">
          <span className="font-bold text-xl align-middle">DEPLOYS BY</span>
          <Icon icon={firebaseIcon} className="w-7 h-7" />
        </span>
      </div>

      <div className="flex-col items-center md:flex-row flex md:justify-between">
        <span className="flex flex-col md:flex-row items-center space-x-4">
          <Logo />

          <span className="p-4 flex text-center md:text-left flex-col space-y-1 md:border-l-2 border-accent  text-gray-500">
            <span>
              <span className="font-semibold">Made by</span>
              <Icon icon={gatsby} className="w-5 h-5 mx-2" />
              TomokiMiyauci
            </span>
            <span className="text-sm">
              ©{new Date().getFullYear()} miyauci.me
            </span>
          </span>
        </span>

        <div className="flex flex-col md:flex-row items-center md:space-x-7">
          <div className="my-4 text-gray-500 space-x-6">
            <a
              href="https://www.npmjs.com/~miyauci"
              target="_blank"
              className="transition duration-200 hover:text-accent"
            >
              <Icon icon={npmOutline} className="w-8 h-8" />
            </a>

            <a
              href="https://twitter.com/tomoki_miyauci"
              target="_blank"
              className="transition duration-200 hover:text-accent"
            >
              <Icon icon={twitter} className="w-8 h-8" />
            </a>

            <a
              href="https://github.com/TomokiMiyauci"
              target="_blank"
              className="transition duration-200 hover:text-accent"
            >
              <Icon icon={github} className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default TheFooter
