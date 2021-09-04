import { useNotice } from '@/hooks/notice'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import Newsletter from '@/components/Newsletter/Newsletter'
import { useSafeLogEvent } from '@/hooks/analytics'
import { defineComponent } from '@/utils/component'
import type { HTTPError, TimeoutError } from 'ky'
import type { Locale } from 'config/types'
import type { ClickEventHandler } from '@/components/Newsletter/Newsletter'

const Index = defineComponent(({ className }) => {
  const notice = useNotice()
  const { locale } = useLocalization()
  const { safeLogEvent } = useSafeLogEvent()

  const onClick: ClickEventHandler = async (email, lang) => {
    const { subscribe } = await import('@/utils/convertkit')

    return subscribe(email, lang)
  }

  const onSuccess = (): void => {
    import('canvas-confetti').then(({ default: _default }) => _default())
    notice({
      type: 'success',
      field: <span>Send you a email. please check it.</span>
    })
    safeLogEvent((analytics, logEvent) => {
      logEvent(analytics, 'subscription', {
        type: 'newsletter'
      })
    })
  }

  const onError = ({ name, message }: HTTPError | TimeoutError): void => {
    notice({
      type: 'alert',
      field: <span>Fail to subscribe</span>
    })
    safeLogEvent((analytics, logEvent) => {
      logEvent(analytics, 'exception', {
        description: message,
        fatal: true,
        name
      })
    })
  }

  return (
    <Newsletter
      onClick={onClick}
      onSuccess={onSuccess}
      onError={onError}
      locale={locale as Locale}
      className={className}
      PrivacyPolicy={
        <div className="m-1">
          <LocalizedLink
            className="text-accent font-bold"
            to="/privacy/"
            rel="noopener"
            target="_blank"
            language={locale}
          >
            Privacy Policy
          </LocalizedLink>
        </div>
      }
    />
  )
})

export default Index
