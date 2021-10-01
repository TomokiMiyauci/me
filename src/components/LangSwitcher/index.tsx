import { Transition } from '@headlessui/react'
import Context from '@/components/LangSwitcher/context'
import ButtonLangSwitcher from '@/components/LangSwitcher/ButtonLangSwitcher'
import PortalBody from '@/components/Portal/PortalBody'
import loadable from '@loadable/component'
import { useSwitch } from '@/hooks/state'
import { Helmet } from 'react-helmet'
import type { FC } from 'react'
const LangSwitcher = loadable(
  () => import('@/components/LangSwitcher/LangSwitcher')
)

const Index: FC = () => {
  const [isShow, changeShow] = useSwitch()
  const { off: hideDialog } = changeShow

  return (
    <Context.Provider value={[isShow, changeShow]}>
      <ButtonLangSwitcher />

      <PortalBody>
        <Transition
          show={isShow}
          enter="transition transform duration-500"
          enterFrom="opacity-0 translate-x-full md:translate-x-10"
          leave="transition transform duration-500"
          leaveTo="translate-x-full md:opacity-0 md:translate-x-10"
          className="inset-0 fixed p-4 md:p-40 backdrop-blur-md cursor-pointer"
          onClick={hideDialog}
        >
          <Helmet
            bodyAttributes={{
              'data-fullscreen': 'true'
            }}
          />
          <LangSwitcher
            onClick={(ev) => ev.stopPropagation()}
            className="h-full md:max-h-[600px] cursor-auto relative md:max-w-4xl mx-auto"
          />
        </Transition>
      </PortalBody>
    </Context.Provider>
  )
}

export default Index
