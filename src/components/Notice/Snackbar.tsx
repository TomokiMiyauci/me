import React, { FC, useMemo, ReactElement } from 'react'
import SnackbarFrame from '@/components/Notice/SnackbarFrame'
import { Icon } from '@iconify/react/dist/offline'
import info from '@iconify-icons/mdi/info-circle'
import check from '@iconify-icons/mdi/check-circle'
import alert from '@iconify-icons/bx/bxs-error'
import error from '@iconify-icons/bx/bxs-error-circle'
import close from '@iconify-icons/mdi/close-circle'
import { classNames } from '@/utils/class_name'

type NoticeType = 'success' | 'info' | 'warn' | 'alert'

const Snackbar: FC<{
  type: NoticeType
  children: ReactElement
  className?: string
}> = ({ type, children, className }) => {
  const icon = useMemo<ReactElement>(() => {
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
    }
  }, [type])

  const colorClass = useMemo<string>(() => {
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
    }
  }, [type])

  return (
    <SnackbarFrame
      className={classNames(
        colorClass,
        className ?? '',
        'backdrop-filter backdrop-blur-md bg-opacity-60'
      )}
      icon={icon}
    >
      {children}
    </SnackbarFrame>
  )
}

export default Snackbar
