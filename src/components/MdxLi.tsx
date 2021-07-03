import React, { FC } from 'react'
import { Icon } from '@iconify/react'
import checkDecagram from '@iconify-icons/mdi/check-decagram'

const MdxLi: FC<{ id?: string }> = ({ children, id }) => {
  return (
    <li id={id}>
      <Icon
        className="w-6 h-6 mr-2 align-middle text-accent"
        icon={checkDecagram}
      />
      {children}
    </li>
  )
}

export default MdxLi
