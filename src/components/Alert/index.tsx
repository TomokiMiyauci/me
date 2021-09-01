import { FC } from 'react'
import alert from '@iconify-icons/mdi/alert'
import { Icon } from '@iconify/react/dist/offline'

type AlertType = 'warning'

const getIcon = (type?: AlertType) => {
  switch (type) {
    case 'warning': {
      return alert
    }
  }
}

const iconColor = (type?: AlertType): string | undefined => {
  switch (type) {
    case 'warning': {
      return 'text-amber-500'
    }
  }
}

const getBaseColor = (type?: AlertType): string => {
  switch (type) {
    case 'warning': {
      return 'bg-amber-100 ring-amber-200 dark:ring-amber-400 dark:bg-amber-100 text-amber-700'
    }

    default: {
      return 'bg-gray-200 dark:bg-gray-500'
    }
  }
}

const Alert: FC<{ type?: AlertType }> = ({ children, type }) => {
  const icon = getIcon(type)
  const iconColorClassName = iconColor(type)
  const baseClassName = getBaseColor(type)
  return (
    <div
      className={`my-4 rounded-sm md:rounded-md ring  px-4 py-2 bg-gray-200 ${baseClassName}`}
    >
      {icon && (
        <Icon icon={icon} className={`w-7 h-7 mr-2 ${iconColorClassName}`} />
      )}
      <span className=" align-middle">{children}</span>
    </div>
  )
}

export default Alert
