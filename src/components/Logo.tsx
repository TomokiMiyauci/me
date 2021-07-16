import React, { FC } from 'react'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import LogoImg from '@/../assets/logo.svg'

const Logo: FC<{ shrink?: boolean }> = ({ shrink }) => {
  const { locale } = useLocalization()
  return (
    <LocalizedLink language={locale} className="text-4xl space-x-4" to="/">
      <LogoImg className="w-10 fill-current text-accent align-middle h-10" />

      <span className={`${shrink ? 'hidden md:inline' : ''}`}>miyauci.me</span>
    </LocalizedLink>
  )
}

export default Logo
