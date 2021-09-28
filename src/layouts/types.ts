import type { PageContext } from 'config/types'
import type { PageProps } from 'gatsby'

type LayoutContext = Pick<PageContext, 'locale' | 'originalPath'> &
  Pick<PageProps, 'path'>

export { LayoutContext }
