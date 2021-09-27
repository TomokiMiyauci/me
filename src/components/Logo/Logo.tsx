import { LocalizedLink } from 'gatsby-theme-i18n'
import loadable from '@loadable/component'
const LogoSvg = loadable(() => import('@/assets/logo.svg'))
import Suspense from '@/components/Suspense'
import SkeltonLoader from '@/components/SkeltonLoader/SkeltonLoader'

import type { FC } from 'react'
import type { Locale } from '@/../config/types'

const Logo: FC<{ shrink?: boolean; locale: Locale }> = ({ shrink, locale }) => {
  return (
    <LocalizedLink
      aria-label="Home"
      language={locale}
      className="text-4xl space-x-4 whitespace-nowrap"
      to="/"
    >
      <Suspense
        fallback={
          <SkeltonLoader className="w-9 rounded-md align-middle inline-flex h-10" />
        }
      >
        <LogoSvg className="w-9 fill-current text-accent align-middle h-10" />
      </Suspense>

      <span className={`text-accent ${shrink && 'hidden xl:inline'}`}>
        miyauci.me
      </span>
    </LocalizedLink>
  )
}

export default Logo
