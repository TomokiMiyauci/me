import { FC } from 'react'
import { LocalizedLink } from 'gatsby-theme-i18n'
import LogoSvg from '@/assets/logo.svg'
import type { Locale } from '@/../config/types'

const Logo: FC<{ shrink?: boolean; locale: Locale }> = ({ shrink, locale }) => {
  return (
    <LocalizedLink
      aria-label="Home"
      language={locale}
      className="text-4xl space-x-4 whitespace-nowrap"
      to="/"
    >
      <LogoSvg className="w-9 fill-current text-accent align-middle h-10" />

      <span className={`text-accent ${shrink && 'hidden xl:inline'}`}>
        miyauci.me
      </span>
    </LocalizedLink>
  )
}

export default Logo
