import { useState, Fragment } from 'react'
import { Transition } from '@headlessui/react'
import ButtonAccentColor from '@/components/AccentColor/ButtonAccentColor'
import Context from '@/components/AccentColor/context'

import { Helmet } from 'react-helmet'
import loadable from '@loadable/component'
const AccentColor = loadable(
  () => import('@/components/AccentColor/AccentColor')
)
const PortalBody = loadable(() => import('@/components/Portal/PortalBody'))

import type { FC } from 'react'

const Index: FC = () => {
  const [isShow, changeShow] = useState(false)

  return (
    <Context.Provider value={[isShow, changeShow]}>
      <ButtonAccentColor />

      <PortalBody>
        <Transition
          show={isShow}
          enter="transition duration-500"
          enterFrom="backdrop-opacity-0"
          leave="transition duration-500"
          leaveTo="backdrop-opacity-0"
          as={Fragment}
        >
          <div
            onClick={() => changeShow(false)}
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
                <AccentColor />
              </div>
            </Transition.Child>
          </div>
        </Transition>
      </PortalBody>
    </Context.Provider>
  )
}

export default Index
