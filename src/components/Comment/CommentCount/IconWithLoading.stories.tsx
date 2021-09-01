import { ComponentStory, ComponentMeta } from '@storybook/react'

import IconWithLoading from './IconWithLoading'

const meta: ComponentMeta<typeof IconWithLoading> = {
  title: 'IconWithLoading',
  component: IconWithLoading,

  args: {
    children: <div>This is main</div>,
    loading: false
  }
}

const Template: ComponentStory<typeof IconWithLoading> = (args) => (
  <IconWithLoading {...args} />
)

const Default = Template.bind({})

export default meta
export { Default }
