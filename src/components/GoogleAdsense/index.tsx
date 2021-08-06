import React, { FC, useEffect, CSSProperties } from 'react'

const Index: FC<{
  className?: string
  style?: CSSProperties
  dataAdFormat: 'fluid' | 'auto'
  dataAdSlot: string
  dataAdLayout?: string
  dataAdLayoutKey?: string
  dataFullWidthResponsive?: 'false' | 'true'
}> = ({
  className,
  style,
  dataAdFormat,
  dataAdLayout,
  dataAdSlot,
  dataFullWidthResponsive
}) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && window.adsbygoogle) {
      window.adsbygoogle.push({})
    }
  }, [])
  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-layout={dataAdLayout}
      data-ad-format={dataAdFormat}
      data-ad-client="ca-pub-3149742411805247"
      data-ad-slot={dataAdSlot}
      data-full-width-responsive={dataFullWidthResponsive}
    />
  )
}

export default Index
