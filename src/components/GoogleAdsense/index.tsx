import React, { FC, useEffect, CSSProperties } from 'react'

const Index: FC<{
  style?: CSSProperties
  dataAdFormat: 'fluid'
  dataAdSlot: string
  dataAdLayout?: string
  dataAdLayoutKey?: string
}> = ({ style, dataAdFormat, dataAdLayout, dataAdSlot }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && window.adsbygoogle) {
      window.adsbygoogle.push({})
    }
  }, [])
  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-layout={dataAdLayout}
      data-ad-format={dataAdFormat}
      data-ad-client="ca-pub-3149742411805247"
      data-ad-slot={dataAdSlot}
    />
  )
}

export default Index
