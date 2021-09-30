import Portal from '@/components/Portal/Portal'
import { forwardRef, cloneElement } from 'react'
import { isBrowser } from '@/utils/environment'

const PortalBody = forwardRef<any, { children: JSX.Element }>(
  ({ children }, ref) => {
    if (!isBrowser) {
      return <></>
    }

    return (
      <Portal element={document.getElementsByTagName('body')[0]}>
        {cloneElement(children, { ref })}
      </Portal>
    )
  }
)

export default PortalBody
