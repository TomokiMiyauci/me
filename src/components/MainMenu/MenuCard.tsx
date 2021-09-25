import { Icon } from '@iconify/react/dist/offline'
import { classNames } from '@/utils/class_name'
import blogicon from '@iconify-icons/carbon/blog'
import code from '@iconify-icons/carbon/code'
import camera from '@iconify-icons/mdi/camera-outline'

import type { IconifyIcon } from '@iconify/react/dist/offline'
import type { FC } from 'react'

const MenuCard: FC<{
  title: string
  description: string
  icon: IconifyIcon
  className?: string
}> = ({ title, description, icon, className }) => {
  return (
    <div
      className={classNames(
        'rounded-md hover:scale-105 hover:-translate-y-2 hover:opacity-80 transition duration-300 transform flex flex-col h-full bg-gradient-to-r min-h-[260px] p-6 md:p-10 text-2xl shadow relative',
        className
      )}
    >
      <Icon
        icon={icon}
        className="absolute w-full h-full top-0 left-0 fill-current dark:opacity-10 opacity-30"
      />

      <p className="text-gray-200 flex-1 relative">{description}</p>

      <h2 className="mt-10 text-5xl font-semibold text-white">{title}</h2>
    </div>
  )
}

const MenuCardBlog: FC = () => (
  <MenuCard
    title="Blog"
    description="Technology Information Blog. I write about anything that comes to my mind, regardless of the field."
    icon={blogicon}
    className="from-purple-800 to-pink-700"
  />
)

const MenuCardProject: FC = () => (
  <MenuCard
    title="Project"
    description="My project collection"
    icon={code}
    className="from-yellow-500 to-amber-600"
  />
)
const MenuCardPhoto: FC = () => (
  <MenuCard
    title="Photo"
    description="My photo gallery"
    icon={camera}
    className="from-cyan-500 to-emerald-700"
  />
)
export default MenuCard
export { MenuCardBlog, MenuCardProject, MenuCardPhoto }
