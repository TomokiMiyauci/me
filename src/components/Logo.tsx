import React, { FC } from 'react'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import LL from '../../assets/logo.svg'

const Logo: FC = () => {
  const { locale } = useLocalization()
  return (
    <LocalizedLink language={locale} className="md:text-4xl space-x-4" to="/">
      <LL className="w-10 dark:fill-gray-200 align-middle h-10" />

      <span className="hidden md:inline">miyauci.me</span>
    </LocalizedLink>
  )
}

export default Logo
