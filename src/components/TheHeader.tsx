import React, { FC, useRef, useState, useEffect } from 'react'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import blogicon from '@iconify-icons/carbon/blog'
import { Icon } from '@iconify/react'
import Logo from './Logo'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import useDarkMode from 'use-dark-mode'
import translateIcon from '@iconify-icons/mdi/translate'
import camera from '@iconify-icons/mdi/camera'
import accountIcon from '@iconify-icons/mdi/account-outline'
import { useClickOutside } from '@miyauci/react-click-outside'
import { ifElseFn } from 'fonction'
import AccentColor from './AccentColor'

const LinkButton: FC<{ to: string; originalPath: string }> = ({
  to,
  children,
  originalPath
}) => {
  const { locale } = useLocalization()
  const isActive = (path: string): boolean => originalPath === path

  return (
    <LocalizedLink
      to={to}
      language={locale}
      className={`px-2 py-1 w-11 md:w-16 h-11 md:h-16 shadow text-mini md:text-base md:px-3 flex rounded-full md:px-3 flex items-center justify-center flex-col ${
        isActive(to) ? 'text-accent ring-1 ring-accent' : ''
      }`}
    >
      {children}
    </LocalizedLink>
  )
}

const TheHeader: FC<{ originalPath: string }> = ({ originalPath }) => {
  const { value, toggle } = useDarkMode(undefined, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const ref = useRef<HTMLUListElement>(null)
  const [isShow, changeShow] = useState(false)
  const toggleShow = ifElseFn(
    () => isShow,
    () => changeShow(false),
    () => changeShow(true)
  )

  useClickOutside(ref, () => changeShow(false), 'mousedown' as any)

  return (
    <header
      className="
      fixed
      md:sticky
      md:top-0
      md:bottom-auto
      md:drop-shadow
      md:mx-auto
      md:border-none
      w-full
      z-50
      bottom-0
      light:bg-gray-50
      dark:bg-gray-900
      border-t
      dark:border-gray-800
    "
    >
      <div
        className="container max-w-8xl p-3 md:py-6 mx-auto items-center
    justify-between flex"
      >
        <span className="flex items-center space-x-3 md:space-x-10">
          <Logo />

          <LinkButton originalPath={originalPath} to="/">
            <Icon className="w-7 h-7" icon={accountIcon} />
            <span>About</span>
          </LinkButton>

          <LinkButton originalPath={originalPath} to="/posts/">
            <Icon className="w-7 h-7" icon={blogicon} />
            <span>Blog</span>
          </LinkButton>

          <LinkButton originalPath={originalPath} to="/photos/">
            <Icon className="w-7 h-7" icon={camera} />
            <span>Photo</span>
          </LinkButton>
        </span>

        <div className="flex space-x-3 md:space-x-8 items-center">
          <div className="relative flex items-center">
            <button className="flex text-accent" onClick={toggleShow}>
              <Icon className="w-8 h-8" icon={translateIcon} />
            </button>

            {isShow && (
              <ul
                ref={ref}
                className="
          absolute
          rounded-md
          light:bg-white
          dark:bg-gray-800
          mt-2
          right-0
          bottom-10
          shadow
          text-lg
          md:(bottom-auto)
          md:top-8
          hover:shadow-md
          p-3
        "
              >
                <li>
                  <LocalizedLink to={originalPath} language="en">
                    English
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink to={originalPath} language="ja">
                    日本語
                  </LocalizedLink>
                </li>
              </ul>
            )}
          </div>

          <AccentColor />

          {isClient ? (
            <DarkModeSwitch
              checked={value}
              sunColor="var(--accent-color)"
              moonColor="var(--accent-color)"
              onChange={toggle}
              size={30}
            />
          ) : (
            <span className="w-30px h-30px" />
          )}
        </div>
      </div>
    </header>
  )
}

export default TheHeader
