import { FC, Dispatch, SetStateAction } from 'react'
import { Switch } from '@headlessui/react'
import { Icon } from '@iconify/react/dist/offline'
import globalOutlined from '@iconify/icons-ant-design/global-outlined'
import flagForJapan from '@iconify/icons-emojione/flag-for-japan'
import { classNames } from '@/utils/class_name'
import { useSafeLogEvent } from '@/hooks/firebase/analytics'

const Index: FC<{
  enabled: boolean
  setEnabled: Dispatch<SetStateAction<boolean>>
  className?: string
}> = ({ enabled, setEnabled, className }) => {
  const { safeLogEvent } = useSafeLogEvent()

  const handleChange = async (checked: boolean): Promise<void> => {
    setEnabled(checked)
    const { logEvent } = await import('firebase/analytics')

    safeLogEvent((analytics) => {
      logEvent(analytics, 'select_content', {
        content_type: 'button_locale_switch',
        checked
      })
    })
  }
  return (
    <>
      <span className={classNames('inline-flex', className)}>
        <span className="self-end select-none">EN</span>
        <Icon icon={globalOutlined} className="w-9 h-9" />
        <Switch
          checked={enabled}
          onChange={handleChange}
          className={`mx-3 ${enabled ? 'bg-accent' : 'bg-accent opacity-80'}
  relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
          pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
        <Icon icon={flagForJapan} className="w-9 h-9" />
        <span className="self-end select-none">JA</span>
      </span>
    </>
  )
}

export default Index
