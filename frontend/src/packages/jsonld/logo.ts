import type { Url } from './types'
interface LogoParams {
  url: Url
  logoUrl: string
}

interface Logo {
  '@type': 'Organization'
  url: Url
  logo: string
}

const logo = ({ url, logoUrl }: LogoParams): Logo => ({
  '@type': 'Organization',
  url,
  logo: logoUrl
})

export { logo, LogoParams }
