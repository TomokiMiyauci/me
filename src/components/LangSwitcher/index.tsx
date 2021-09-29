import { useState, BaseSyntheticEvent } from 'react'
import { Transition } from '@headlessui/react'
import Context from '@/components/LangSwitcher/context'
import ButtonLangSwitcher from '@/components/LangSwitcher/ButtonLangSwitcher'
import { createPortal } from 'react-dom'
import { isBrowser } from '@/utils/environment'
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet'
import type { FC } from 'react'
const LangSwitcher = loadable(
  () => import('@/components/LangSwitcher/LangSwitcher')
)

const Portal: FC = ({ children }) => {
  if (!isBrowser) {
    return <></>
  }
  return createPortal(children, document.getElementsByTagName('body')[0])
}

const Index: FC = () => {
  const [isShow, changeShow] = useState(false)

  return (
    <Context.Provider value={[isShow, changeShow]}>
      <ButtonLangSwitcher />

      <Portal>
        <Transition
          show={isShow}
          enter="transition transform duration-500"
          enterFrom="opacity-0 translate-x-full md:translate-x-10"
          leave="transition transform duration-500"
          leaveTo="translate-x-full md:opacity-0 md:translate-x-10"
          className="inset-0 fixed p-4 md:p-40 backdrop-blur-md cursor-pointer"
          onClick={(ev: BaseSyntheticEvent<object, any, HTMLElement>) => {
            const result = ev.target.getAttribute('data-fullscreen')
            if (result === 'true') {
              changeShow(false)
            }
          }}
          data-fullscreen="true"
        >
          <Helmet>
            <body data-fullscreen="true" />
          </Helmet>
          <LangSwitcher className="h-full md:max-h-[600px] cursor-auto relative md:max-w-4xl mx-auto" />
        </Transition>
      </Portal>
    </Context.Provider>
  )
}

export default Index
