import { ComponentStory, ComponentMeta } from '@storybook/react'

import Navigation from './Navigation'
import { navigations } from './constants'

const meta: ComponentMeta<typeof Navigation> = {
  title: 'Navigation',
  component: Navigation,

  args: {
    navigations,
    currentPath: '/'
  }
}

const Template: ComponentStory<typeof Navigation> = (args) => (
  <Navigation {...args} />
)

const Default = Template.bind({})

const ClassName = Template.bind({})

ClassName.args = {
  className: 'fixed bottom-0 inset-x-0 w-full border-t'
}

export default meta
export { Default, ClassName }
