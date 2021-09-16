import shieldLockOutline from '@iconify-icons/mdi/shield-lock-outline'
import { Icon } from '@iconify/react/dist/offline'
import { Link } from 'gatsby'

import type { FC } from 'react'

const MustSignin: FC = () => {
  return (
    <div className="grid place-items-center space-y-4">
      <span className="text-center space-y-1">
        <Icon icon={shieldLockOutline} className="w-20 h-20" />
        <p>You must login</p>
      </span>
      <Link
        className="rounded-md bg-teal-500 px-2 py-1"
        to={`/login/?redirect=${window.location.pathname}`}
      >
        Login
      </Link>
    </div>
  )
}

export default MustSignin
