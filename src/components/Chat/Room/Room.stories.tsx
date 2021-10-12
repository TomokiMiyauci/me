import type { Meta, ComponentStory } from '@storybook/react'
import Room from '@/components/Chat/Room/Room'

const Template: ComponentStory<typeof Room> = (args) => (
  <div className="flex p-2 space-x-3">
    <Room {...args} />
  </div>
)

const Default = Template.bind({})
const UnreadMessages = Template.bind({})

UnreadMessages.args = {
  unreadMessages: 2
}

export default {
  title: 'chat/room',
  component: Room,
  args: {
    title: 'Public chat rooms',
    message: 'Test message',
    icon: () => import('@iconify/icons-bx/bx-world'),
    date: new Date('2020/1/1')
  }
} as Meta<typeof Room>

export { Default, UnreadMessages }
