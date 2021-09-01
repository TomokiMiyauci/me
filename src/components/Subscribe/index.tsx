import { FC } from 'react'
import Newsletter from '@/components/Newsletter'
import { useState } from 'react'
import { Icon, IconifyIcon } from '@iconify/react/dist/offline'
import loveLetter from '@iconify/icons-emojione-monotone/love-letter'
import noticePush from '@iconify/icons-fe/notice-push'
import { Transition } from '@headlessui/react'
import WebPush from '@/components/WebPush'

type ButtonProps = {
  title: string
  icon: IconifyIcon
  condition: State
}

const buttons: ButtonProps[] = [
  {
    title: 'newsletter',
    icon: loveLetter,
    condition: 'newsletter'
  },
  {
    title: 'web push',
    icon: noticePush,
    condition: 'webpush'
  }
]

type State = 'newsletter' | 'webpush'

const Index: FC = () => {
  const [state, changeState] = useState<State>('newsletter')
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
        {buttons.map(({ title, icon, condition }) => {
          return (
            <button
              key={condition}
              onClick={() => changeState(condition)}
              className={`relative flex dark:hover:bg-blue-gray-800 hover:opacity-80 transition duration-300 px-1 items-end h-28 md:h-36 w-28 md:w-36 rounded-md ${
                state === condition
                  ? 'bg-gradient-to-b from-accent dark:bg-blue-gray-900 bg-gray-50'
                  : ''
              }`}
            >
              <Icon
                icon={icon}
                className="absolute inset-0 m-auto w-[70%] h-[70%]"
              />
              <span className="text-accent pl-1 pb-1 font-bold text-shadow-sm capitalize">
                {title}
              </span>
            </button>
          )
        })}
      </div>

      <div className="min-h-[430px]">
        <Transition
          show={state === 'newsletter'}
          enter="transform transition duration-500"
          enterFrom="-translate-x-full md:translate-x-0 opacity-0 md:scale-y-0"
          enterTo="opacity-100"
        >
          <Newsletter />
        </Transition>

        <Transition
          show={state === 'webpush'}
          enter="transform transition duration-500"
          enterFrom="-translate-x-full md:translate-x-0 opacity-0 md:scale-y-0"
          enterTo="opacity-100"
        >
          <WebPush />
        </Transition>
      </div>
    </>
  )
}

export default Index
