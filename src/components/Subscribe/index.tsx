import React, { FC } from 'react'
import Newsletter from '@/components/Newsletter'
import { useState } from 'react'
import { Icon } from '@iconify/react/dist/offline'
import loveLetter from '@iconify/icons-emojione-monotone/love-letter'
import noticePush from '@iconify/icons-fe/notice-push'

import loadable from '@loadable/component'
const WebPush = loadable(() => import('@/components/WebPush'))

const Index: FC = () => {
  const [state, changeState] = useState<'newsletter' | 'webpush'>('newsletter')
  return (
    <>
      <h3 className="text-3xl md:text-5xl z-[1] md:z-0 -mx-4 sticky md:static px-4 py-3 top-0 bg-gray-50 dark:bg-blue-gray-900 flex items-center space-x-2 md:space-x-4">
        <span className="inline-flex relative h-3 w-3 md:h-5 md:w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-80" />
          <span className="inline-flex rounded-full h-3 w-3 md:h-5 md:w-5 bg-accent" />
        </span>
        <span>Notification</span>
      </h3>
      <p className="text-gray-500 md:text-xl">
        There are various ways to notify you the publication of an article.
      </p>
      <div className="flex my-4 justify-center space-x-12">
        <button
          onClick={() => changeState('newsletter')}
          className={`relative flex dark:hover:bg-blue-gray-800 hover:opacity-80 transition duration-300 px-1 items-end h-28 md:h-36 w-28 md:w-36 rounded-md ${
            state === 'newsletter'
              ? 'bg-gradient-to-b from-accent dark:bg-blue-gray-900 bg-gray-50'
              : ''
          }`}
        >
          <Icon
            icon={loveLetter}
            className="absolute inset-0 m-auto w-[70%] h-[70%]"
          />
          <span className="text-accent pl-1 pb-1 font-bold text-shadow-sm">
            Newsletter
          </span>
        </button>
        <button
          onClick={() => changeState('webpush')}
          className={`relative flex dark:hover:bg-blue-gray-800 hover:opacity-80 transition duration-300 px-1 items-end h-28 md:h-36 w-28 md:w-36 rounded-md ${
            state === 'webpush'
              ? 'bg-gradient-to-b from-accent dark:bg-blue-gray-900 bg-gray-50'
              : ''
          }`}
        >
          <Icon
            icon={noticePush}
            className="absolute inset-0 m-auto w-[70%] h-[70%]"
          />
          <span className="text-accent pl-1 pb-1 font-bold text-shadow-sm">
            Web Push
          </span>
        </button>
      </div>

      {state === 'newsletter' && <Newsletter />}
      {state === 'webpush' && <WebPush />}
    </>
  )
}

export default Index
