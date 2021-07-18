import React, { FC } from 'react'
import roundSearchOff from '@iconify-icons/ic/round-search-off'
import { Icon } from '@iconify/react'
import Tag from '@/components/Tag'
import magnify from '@iconify-icons/mdi/magnify'

const Index: FC<{ query?: string; tag?: string; className?: string }> = ({
  query,
  tag,
  className
}) => {
  return (
    <div className={`flex items-center p-4 space-y-4 flex-col ${className}`}>
      <span className="space-x-2">
        <Icon className="w-12 h-12" icon={roundSearchOff} />
        <span className="text-4xl align-middle">Not found</span>
      </span>

      {query && (
        <span>
          <Icon icon={magnify} className="w-7 h-7" />
          <span>{query}</span>
        </span>
      )}

      {tag && <Tag tag={tag} />}
    </div>
  )
}

export default Index
