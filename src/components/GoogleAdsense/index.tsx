import React, { FC, useEffect } from 'react'

const Index: FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && window.adsbygoogle) {
      window.adsbygoogle.push({})
    }
  }, [])
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', textAlign: 'center' }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-3149742411805247"
      data-ad-slot="3091227579"
    />
  )
}

export default Index
