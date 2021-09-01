import { FC } from 'react'
import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import { Icon } from '@iconify/react/dist/offline'
import blogicon from '@iconify-icons/carbon/blog'
import code from '@iconify-icons/carbon/code'
import camera from '@iconify-icons/mdi/camera-outline'
import PartialHydrate from '@/components/PartialHydrate'

const Index: FC = () => {
  const { locale } = useLocalization()

  return (
    <>
      <LocalizedLink to="/posts/" language={locale}>
        <PartialHydrate className="h-full rounded-md hover:scale-105 hover:-translate-y-2 hover:opacity-80 transition duration-300 transform block bg-gradient-to-r min-h-[260px] p-6 md:p-10 from-purple-800 to-pink-700 text-2xl shadow relative">
          <Icon
            icon={blogicon}
            className="absolute w-full h-full top-0 left-0 fill-current dark:opacity-10 opacity-30"
          />

          <p className="text-gray-200 z-10">
            Technology Information Blog. I write about anything that comes to my
            mind, regardless of the field.
          </p>

          <h2 className="mt-10 text-5xl font-semibold text-white">Blog</h2>
        </PartialHydrate>
      </LocalizedLink>

      <LocalizedLink to="/projects/" language={locale}>
        <PartialHydrate className="h-full flex flex-col rounded-md hover:scale-105 hover:-translate-y-2 hover:opacity-80 transition duration-300 transform bg-gradient-to-r min-h-[260px] p-6 md:p-10 from-yellow-500 to-amber-600 text-2xl shadow relative">
          <Icon
            icon={code}
            className="absolute w-full h-full top-0 left-0 fill-current dark:opacity-10 opacity-30"
          />
          <p className="text-gray-200 flex-1 z-10">My project collection.</p>

          <h2 className="mt-10 text-5xl font-semibold text-white">Project</h2>
        </PartialHydrate>
      </LocalizedLink>

      <LocalizedLink to="/photos/" language={locale}>
        <PartialHydrate className="h-full rounded-md hover:scale-105 hover:-translate-y-2 hover:opacity-80 transition duration-300 transform flex flex-col justify-between min-h-[260px] bg-gradient-to-r p-6 md:p-10 from-cyan-500 to-emerald-700 text-2xl shadow relative">
          <Icon
            icon={camera}
            className="absolute w-full h-full top-0 left-0 fill-current dark:opacity-10 opacity-20"
          />
          <p className="text-gray-200">My photo gallery</p>
          <h2 className="mt-10 text-5xl font-semibold text-white">Photo</h2>
        </PartialHydrate>
      </LocalizedLink>
    </>
  )
}

export default Index
