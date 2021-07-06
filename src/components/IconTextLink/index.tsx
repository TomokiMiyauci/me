import React, { FC } from 'react'
import { Link } from 'gatsby'
import { Navi } from './types'
import IconWith from '../IconWith'

const IconTextLink: FC<Navi> = ({ to, icon, title, isActive }) => (
  <Link
    to={to}
    className={`flex p-2 md:py-4 md:px-6 hover:bg-gray-100 dark:hover:bg-blue-gray-800 hover:opacity-70 duration-300 transition flex-col justify-center items-center ${
      isActive ? 'text-accent bg-gray-100 dark:bg-blue-gray-800' : ''
    }`}
  >
    <IconWith icon={icon} className="w-7 h-7 md:w-9 md:h-9">
      <span className="text-[0.65rem] md:text-xs">{title}</span>
    </IconWith>
  </Link>
)

export default IconTextLink
