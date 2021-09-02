import { FC } from 'react'
import type { ClickEventHandler } from '@/components/Newsletter/Newsletter'
import { useNotice } from '@/hooks/notice'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import Newsletter from '@/components/Newsletter/Newsletter'

const Index: FC = () => {
  const [_, notice] = useNotice()
  const { locale } = useLocalization()

  const onClick: ClickEventHandler = async (email) => {
    fetch('https://api.convertkit.com/v3/forms/2439368/subscribe', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        api_key: process.env.GATSBY_CONVERTKIT_API_KEY,
        email,
        tags: [2499579]
      })
    })
  }

  const onSuccess = () => {
    import('canvas-confetti').then(({ default: _default }) => _default())
    notice({
      type: 'success',
      field: (
        <span className="flex items-center">
          Send you a email. please check it.
        </span>
      )
    })
  }

  return (
    <Newsletter
      onClick={onClick}
      onSuccess={onSuccess}
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
