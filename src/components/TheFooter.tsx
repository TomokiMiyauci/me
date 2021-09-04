import { memo } from 'react'
import { Icon } from '@iconify/react/dist/offline'
import twitter from '@iconify-icons/uil/twitter-alt'
import github from '@iconify-icons/uil/github-alt'
import npmOutline from '@iconify-icons/eva/npm-outline'
import heart from '@iconify-icons/mdi/heart-outline'
import { LocalizedLink } from 'gatsby-theme-i18n'
import Logo from '@/components/Logo'
import PartialHydrate from '@/components/PartialHydrate'
import loadable from '@loadable/component'
import Intersection from '@/components/Intersection'

import type { Locale } from 'config/types'
import type { FC } from 'react'

const By = loadable(() => import('@/components/By/By'))

const TheFooter: FC<{ locale: Locale }> = ({ locale }) => {
  return (
    <footer className="px-4 py-4 md:py-12 mb-16 space-y-4 container m-auto md:mb-auto">
      <Intersection rootMargin="100px">
        <By />
      </Intersection>

      <div className="flex-col items-center md:flex-row flex md:justify-between">
        <span className="flex flex-col md:flex-row items-center space-x-4">
          <Logo locale={locale} />

          <PartialHydrate
            as="span"
            className="p-4 flex text-center md:text-left flex-col space-y-1 md:border-l-2 border-accent  text-gray-500"
          >
            <span>
              <span className="font-semibold text-accent">Made by</span>
              <Icon icon={heart} className="text-accent w-6 h-6 mx-2" />
              TomokiMiyauci
            </span>
            <span className="text-sm">
              ©{new Date().getFullYear()} miyauci.me
            </span>
          </PartialHydrate>
        </span>

        <nav className="flex justify-around flex-row lg:space-x-12 lg:flex-wrap gap-2 w-full md:w-auto">
          <ul className="space-y-4">
            <li>
              <LocalizedLink language={locale} className="text-gray-500" to="/">
                About
              </LocalizedLink>
            </li>

            <li>
              <LocalizedLink
                language={locale}
                className="text-gray-500"
                to="/posts"
              >
                Blog
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                language={locale}
                className="text-gray-500"
                to="/projects"
              >
                Project
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink
                language={locale}
                className="text-gray-500"
                to="/photos"
              >
                Photo
              </LocalizedLink>
            </li>
          </ul>
          <ul>
            <li>
              <LocalizedLink
                language={locale}
                className="text-gray-500"
                to="/privacy/"
              >
                Privacy Policy
              </LocalizedLink>
            </li>
          </ul>
        </nav>

        <PartialHydrate
          isStatic
          className="flex  flex-nowrap items-center my-4 text-gray-500 space-x-8 md:space-x-4 lg:space-x-6"
        >
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
        </PartialHydrate>
      </div>
    </footer>
  )
}

export default memo(TheFooter)
