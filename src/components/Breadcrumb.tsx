import React, { FC } from 'react'
import { LocalizedLink as Link } from 'gatsby-theme-i18n'
import { useLocalization } from 'gatsby-theme-i18n'
import { Icon } from '@iconify/react'

const Breadcrumb: FC<Partial<{ title: string; to: string }>> = ({
  title,
  to
}) => {
  const { locale } = useLocalization()
  return (
    <ul className="mb-0 md:mb-4 scrollbar-thin scrollbar-thumb-accent whitespace-nowrap space-x-2 dark:text-gray-200 overflow-x-scroll border-b dark:border-blue-gray-800 md:border-none p-2 px-4 md:p-0 md:mx-0 -m-4">
      <li className="inline">
        <Link
          className="align-middle  hover:text-accent transition duration-200"
          to="/posts/"
          language={locale}
        >
          <Icon icon="carbon:blog" className="w-6 h-6" />
        </Link>
      </li>
      <li className="inline align-middle">
        <Icon className="align-middle" icon="mdi:chevron-right" />
      </li>
      {to && (
        <li className="inline text-accent align-middle">
          <Link to={to} language={locale} className="align-middle">
            {title}
          </Link>
        </li>
      )}
    </ul>
  )
}

export default Breadcrumb
