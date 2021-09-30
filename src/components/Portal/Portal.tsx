import { createPortal } from 'react-dom'

import type { FC } from 'react'

const Portal: FC<{ element: Element }> = ({ children, element }) =>
  createPortal(children, element)

export default Portal
