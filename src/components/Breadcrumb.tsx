import React, { FC } from 'react'
import { LocalizedLink as Link } from 'gatsby-theme-i18n'
import { useLocalization } from 'gatsby-theme-i18n'
import { Icon } from '@iconify/react'
import ChevronDouble from '@iconify-icons/mdi/chevron-right'
const Breadcrumb: FC<Partial<{ title: string; to: string }>> = ({
  title,
  to
}) => {
  const { locale } = useLocalization()
  return (
    <ul className="mb-5 space-x-2 dark:text-gray-200 border-b md:border-none p-2 md:p-0 md:mx-0 -m-4">
      <li className="inline">
        <Link
          className="align-middle  hover:text-teal-500 transition duration-200"
          to="/posts/"
          language={locale}
        >
          Article List
        </Link>
      </li>
      <li className="inline align-middle">
        <Icon className="align-middle" icon={ChevronDouble} />
      </li>
      {to && (
        <li className="inline dark:text-gray-100">
          <Link to={to} language={locale} className="align-middle ">
            {title}
          </Link>
        </li>
      )}
    </ul>
  )
}

export default Breadcrumb
