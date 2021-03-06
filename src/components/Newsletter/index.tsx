import React, { FC, useContext } from 'react'
import Newsletter, { ClickEventHandler } from './Newsletter'
import Context from '../Snackbar/Context'
import bxMailSend from '@iconify-icons/bx/bx-mail-send'

const Index: FC = () => {
  const [_, notice] = useContext(Context)

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
      icon: bxMailSend,
      field: (
        <span className="flex items-center">
          Send you a email. please check it.
        </span>
      ),
      iconClass: 'text-accent'
    })
  }

  return <Newsletter onClick={onClick} onSuccess={onSuccess} />
}

export default Index
