import { FC } from 'react'
import type { ClickEventHandler } from '@/components/Newsletter/Newsletter'
import { useNotice } from '@/hooks/notice'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import Newsletter from '@/components/Newsletter/Newsletter'
import type { HTTPError } from 'ky'

const Index: FC = () => {
  const [_, notice] = useNotice()
  const { locale } = useLocalization()

  const onClick: ClickEventHandler = async (email) => {
    const { subscribe } = await import('@/utils/convertkit')

    return subscribe(email, 'en')
  }

  const onSuccess = () => {
    import('canvas-confetti').then(({ default: _default }) => _default())
    notice({
      type: 'success',
      field: <span>Send you a email. please check it.</span>
    })
  }

  const onError = (_: HTTPError): void => {
    notice({
      type: 'alert',
      field: <span>Fail to subscribe</span>
    })
  }

  return (
    <Newsletter
      onClick={onClick}
      onSuccess={onSuccess}
      onError={onError}
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
}

export default Index
