import React, { FC } from 'react'
import { Icon } from '@iconify/react'

const MdxH2: FC<{ id: string; title: string }> = ({ id, title }) => (
  <h2 id={id} className="relative group">
    <a
      aria-label={`${title} permalink`}
      href={`#${id}`}
      className="absolute transform opacity-0 duration-300  transition-opacity -translate-x-full  md:group-hover:opacity-100"
    >
      <Icon icon="mdi:link-variant" />
    </a>
    {title}
  </h2>
)

export default MdxH2
