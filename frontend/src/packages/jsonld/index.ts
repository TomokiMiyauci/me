import { breadcrumb, ParamsBreadcrumb } from './breadcrumb'
import { logo, LogoParams } from './logo'
interface Params {
  breadcrumb?: ParamsBreadcrumb[]
  logo?: LogoParams
}

const jsonld = (params: Params) => ({
  '@context': 'https://schema.org',
  ...(params.breadcrumb ? breadcrumb(params.breadcrumb) : {}),
  ...(params.logo ? logo(params.logo) : {})
})

export { breadcrumb, jsonld }
