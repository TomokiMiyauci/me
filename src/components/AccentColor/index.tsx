import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import ButtonAccentColor from '@/components/AccentColor/ButtonAccentColor'
import Context from '@/components/AccentColor/context'
import CardDialog from '@/components/Card/CardDialog'
import delay from 'p-min-delay'
import { useSwitch } from '@/hooks/state'

import { Helmet } from 'react-helmet'
import loadable from '@loadable/component'
const AccentColor = loadable(
  () => delay(import('@/components/AccentColor/AccentColor'), 1000),
  {
    fallback: (
      <div className="h-full grid place-items-center">
        <ProgressCircle />
      </div>
    )
  }
)
const PortalBody = loadable(() => import('@/components/Portal/PortalBody'))

import type { FC } from 'react'
import { ProgressCircle } from '../ProgressCircle/ProgressCircle'

const Index: FC = () => {
  const [isShow, changeShow] = useSwitch()
  const { off: hideDialog } = changeShow

  return (
    <Context.Provider value={[isShow, changeShow]}>
      <ButtonAccentColor />

      <PortalBody>
        <Transition
          show={isShow}
          enter="transition duration-1000"
          enterFrom="backdrop-opacity-0"
          leave="transition duration-1000"
          leaveTo="backdrop-opacity-0"
          as={Fragment}
        >
          <div
            onClick={hideDialog}
            className="backdrop-blur-md fixed inset-0 cursor-pointer p-4 md:p-40"
          >
            <Helmet bodyAttributes={{ 'data-fullscreen': 'true' }} />
            <Transition.Child
              enter="transition duration-500 transform"
              enterFrom="md:opacity-0 -translate-x-full md:-translate-x-10"
              leave="transition duration-500 transform"
              leaveTo="md:opacity-0 -translate-x-full md:-translate-x-10"
              as={Fragment}
            >
              <div
                onClick={(ev) => {
                  ev.stopPropagation()
                }}
                role="dialog"
                className="h-full w-full md:max-h-[600px] md:max-w-4xl relative cursor-auto mx-auto"
              >
                <CardDialog className="h-full flex flex-col">
                  <AccentColor />
                </CardDialog>
              </div>
            </Transition.Child>
          </div>
        </Transition>
      </PortalBody>
    </Context.Provider>
  )
}

export default Index
