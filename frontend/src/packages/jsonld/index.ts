import { breadcrumb, ParamsBreadcrumb } from './breadcrumb'

interface Params {
  breadcrumb: ParamsBreadcrumb[]
}

const jsonld = (params: Params) => ({
  '@context': 'https://schema.org',
  ...breadcrumb(params.breadcrumb)
})

export { breadcrumb, jsonld }
