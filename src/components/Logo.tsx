import React, { FC } from 'react'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import LogoSvg from '@/assets/logo.svg'

const Logo: FC<{ shrink?: boolean }> = ({ shrink }) => {
  const { locale } = useLocalization()
  return (
    <LocalizedLink language={locale} className="text-4xl space-x-4" to="/">
      <LogoSvg className="w-10 fill-current text-accent align-middle h-10" />

      <span className={`text-accent ${shrink && 'hidden lg:inline'}`}>
        miyauci.me
      </span>
    </LocalizedLink>
  )
}

export default Logo
