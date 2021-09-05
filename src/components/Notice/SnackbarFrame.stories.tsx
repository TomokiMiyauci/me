import { ComponentStory, ComponentMeta } from '@storybook/react'
import SnackbarFrame from '@/components/Notice/SnackbarFrame'
import info from '@iconify-icons/mdi/info-circle'
import { Icon } from '@iconify/react/dist/offline'
import closeIcon from '@iconify-icons/mdi/close-circle'

const meta: ComponentMeta<typeof SnackbarFrame> = {
  title: 'Notice/SnackbarFrameFrame',
  component: SnackbarFrame,
  args: {
    children: (
      <span className="flex items-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio hic
        aliquid voluptate voluptatibus laboriosam, aperiam perspiciatis minima
        voluptas quia nisi eius, obcaecati sequi laborum architecto? Officia hic
        temporibus possimus dolorem!
      </span>
    ),
    icon: <Icon className="text-sky-300" icon={info} />,
    close: (
      <button>
        <Icon className="w-8 h-8" icon={closeIcon} />
      </button>
    ),
    className: 'max-w-xs'
  }
}

const Template: ComponentStory<typeof SnackbarFrame> = (args) => (
  <SnackbarFrame {...args} />
)

const Default = Template.bind({})

export default meta
export { Default }
