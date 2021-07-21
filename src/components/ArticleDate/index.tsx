import React, { FC, useState } from 'react'
import calendarTextOutline from '@iconify-icons/mdi/calendar-text-outline'
import { Icon } from '@iconify/react/dist/offline'
import cached from '@iconify-icons/mdi/cached'

const ArticleDate: FC<{
  publishAt: string
  modifiedAt?: string
  isModified: boolean
}> = ({ publishAt, modifiedAt, isModified }) => {
  const [isShow, changeShow] = useState(false)
  return (
    <>
      <span className="relative">
        {isModified && isShow && (
          <span className="space-x-1 p-1 border border-accent text-center whitespace-nowrap overflow-x-scroll -top-11 inset-x-0 mx-auto rounded absolute bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 dark:from-purple-500 dark:via-pink-500 dark:to-amber-500 text-gray-800 dark:text-gray-50">
            <Icon icon={calendarTextOutline} className="w-6 h-6" />
            <span className="align-middle p-1 md:text-lg">{publishAt}</span>
          </span>
        )}
        <span
          onMouseOver={() => changeShow(true)}
          onMouseLeave={() => changeShow(false)}
          className="space-x-1"
        >
          <Icon
            icon={isModified ? cached : calendarTextOutline}
            className="w-6 h-6 md:w-7 md:h-7 text-accent"
          />
          <span className="align-middle p-1  md:text-xl">
            {isModified ? modifiedAt : publishAt}
          </span>
        </span>
      </span>
    </>
  )
}

export default ArticleDate
