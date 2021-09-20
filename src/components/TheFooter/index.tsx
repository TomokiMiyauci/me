import loadable from '@loadable/component'
import { Static } from 'react-partial-hydration'
import { Icon } from '@iconify/react/dist/offline'
import heart from '@iconify-icons/mdi/heart-outline'
import { LocalizedLink } from 'gatsby-theme-i18n'
import Logo from '@/components/Logo'

const Nav = loadable(() => import('@/components/TheFooter/Nav'))
const By = loadable(() => import('@/components/By/By'))

import type { Locale } from 'config/types'
import type { FC } from 'react'

const Index: FC<{ locale: Locale }> = ({ locale }) => {
  return (
    <footer className="px-4 py-4 md:py-12 mb-16 space-y-4 container m-auto md:mb-auto">
      <Static>
        <By />
      </Static>

      <div className="flex-col items-center md:flex-row flex md:justify-between">
        <span className="flex flex-col md:flex-row items-center space-x-4">
          <Logo locale={locale} />

          <Static>
            <span className="p-4 flex text-center md:text-left flex-col space-y-1 md:border-l-2 border-accent  text-gray-500">
              <span>
                <span className="font-semibold text-accent">Made by</span>
                <Icon icon={heart} className="text-accent w-6 h-6 mx-2" />
                TomokiMiyauci
              </span>
              <span className="text-sm">
                ©{new Date().getFullYear()} miyauci.me
              </span>
            </span>
          </Static>
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

        <Static>
          <Nav />
        </Static>
      </div>
    </footer>
  )
}

export default Index
