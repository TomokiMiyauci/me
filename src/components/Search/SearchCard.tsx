import { defineComponent } from '@/utils/component'
import { classNames } from '@/utils/class_name'
import type { ReactElement } from 'react'

const SearchCard = defineComponent<{ children: ReactElement }>(
  ({ className, children }) => {
    return (
      <div
        className={classNames(
          'p-2 dark:border dark:border-blue-gray-700 bg-gray-50 dark:bg-blue-gray-800 flex flex-col justify-center cursor-auto rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300',
          className
        )}
      >
        {children}
      </div>
    )
  }
)

export default SearchCard
