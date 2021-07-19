import React, { FC } from 'react'
import { Icon } from '@iconify/react'
import Tag from '@/components/Tag'
import { iconMeta } from '@/utils/tag'

const Index: FC<{ query?: string; tag?: string; className?: string }> = ({
  query,
  tag,
  className
}) => {
  return (
    <div className={`flex items-center p-4 space-y-4 flex-col ${className}`}>
      <span className="space-x-2">
        <Icon className="w-12 h-12" icon="ic:round-search-off" />
        <span className="text-4xl align-middle">Not found</span>
      </span>

      {query && (
        <span>
          <Icon icon="mdi:magnify" className="w-7 h-7" />
          <span>{query}</span>
        </span>
      )}

      {tag && <Tag tag={iconMeta(tag).tagIcon} label={tag} />}
    </div>
  )
}

export default Index
