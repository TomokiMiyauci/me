import type { Order } from '@/components/ArticleHeadline/types'
import { classNames } from '@/utils/class_name'
import heart from '@iconify-icons/mdi/heart'
import { Icon } from '@iconify/react/dist/offline'

const makeAreaComponent = ({
  type,
  value,
  index
}: {
  type: Order | ''
  value?: string
  index?: number
}) => {
  switch (type) {
    case 'recent':
    case '': {
      return (
        <span className="group-hover:opacity-40 transition-opacity duration-300 opacity-20 text-gray-400 dark:text-blue-gray-400 transform rotate-180 text-6xl md:text-7xl writing-mode-vertical">
          {value}
        </span>
      )
    }

    case 'hot': {
      return (
        <span className="text-7xl text-right group-hover:opacity-40 transition-opacity duration-300 opacity-20 text-gray-400 dark:text-blue-gray-400">
          {String(index).padStart(2, '0')}
        </span>
      )
    }

    case 'like': {
      if (index && index <= 10) {
        return (
          <Icon
            icon={heart}
            className={classNames(
              'w-20 h-20 text-pink-600 dark:text-pink-700 group-hover:text-accent transition-colors duration-[1500ms]',
              index === 1 ? 'animate-ping-bit-slow' : 'animate-ping-slow'
            )}
          />
        )
      }
    }
  }
}

export { makeAreaComponent }
