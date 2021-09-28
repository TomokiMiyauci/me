import { Link } from 'gatsby'
import { Navi } from './types'
import { Icon } from '@iconify/react/dist/offline'
import Suspense from '@/components/Suspense'
import SkeltonLoader from '@/components/SkeltonLoader/SkeltonLoader'

import type { FC } from 'react'

const IconTextLink: FC<Navi> = ({ to, icon, title, isActive }) => (
  <Link
    to={to}
    className={`flex p-2 md:py-4 md:px-6 hover:bg-gray-200 dark:hover:bg-blue-gray-800 hover:opacity-70 duration-300 transition flex-col justify-center items-center ${
      isActive ? 'text-accent bg-gray-200 dark:bg-blue-gray-800' : ''
    }`}
  >
    <Suspense
      fallback={<SkeltonLoader className="w-7 h-7 md:w-9 md:h-9 rounded" />}
    >
      <Icon className="w-7 h-7 md:w-9 md:h-9" icon={icon} />
    </Suspense>

    <span className="text-[0.65rem] md:text-xs">{title}</span>
  </Link>
)

export default IconTextLink
