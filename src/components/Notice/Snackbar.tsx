import SnackbarFrame from '@/components/Notice/SnackbarFrame'

import { useMemo } from 'react'
import { Icon } from '@iconify/react/dist/offline'
import info from '@iconify-icons/mdi/info-circle'
import check from '@iconify-icons/mdi/check-circle'
import alert from '@iconify-icons/bx/bxs-error'
import error from '@iconify-icons/bx/bxs-error-circle'
import close from '@iconify-icons/mdi/close-circle'
import { classNames } from '@/utils/class_name'

import type { FC, ReactElement, MouseEventHandler } from 'react'

type NoticeType = 'success' | 'info' | 'warn' | 'alert'

const Snackbar: FC<{
  type?: NoticeType
  icon?: ReactElement
  children: ReactElement
  onClose?: MouseEventHandler
  className?: string
  closeable?: boolean
}> = ({ type, icon, children, className, onClose, closeable = true }) => {
  const handleClose: MouseEventHandler = (e) => {
    if (closeable && onClose) {
      onClose(e)
    }
  }
  const headIcon = useMemo<ReactElement>(() => {
    switch (type) {
      case 'success': {
        return <Icon className="text-emerald-500" icon={check} />
      }
      case 'info': {
        return <Icon className="text-sky-500" icon={info} />
      }
      case 'warn': {
        return <Icon className="text-amber-500" icon={alert} />
      }
      case 'alert': {
        return <Icon className="text-rose-500" icon={error} />
      }

      default: {
        return icon!
      }
    }
  }, [type])

  const colorClass = useMemo<string | undefined>(() => {
    switch (type) {
      case 'success': {
        return 'bg-emerald-500 ring-1 ring-emerald-500 text-emerald-900 dark:text-emerald-100'
      }

      case 'info': {
        return 'bg-sky-500 ring-1 ring-sky-500 text-sky-900 dark:text-sky-100'
      }

      case 'warn': {
        return 'bg-amber-500 ring-1 ring-amber-500 text-amber-900 dark:text-amber-50'
      }

      case 'alert': {
        return 'bg-rose-400 ring-1 ring-rose-500 text-rose-900 dark:text-rose-100'
      }

      default: {
        return className
      }
    }
  }, [type])

  return (
    <SnackbarFrame
      className={classNames(
        colorClass,
        className,
        'backdrop-filter backdrop-blur-md bg-opacity-60'
      )}
      icon={headIcon}
      close={
        closeable ? (
          <button
            className="m-1 p-1 hover:bg-inherit md:rounded-md transition-colors duration-300"
            title="Close"
            onClick={handleClose}
          >
            <Icon className="w-6 h-6" icon={close} />
          </button>
        ) : undefined
      }
    >
      {children}
    </SnackbarFrame>
  )
}

export default Snackbar
