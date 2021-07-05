import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PureNavigation as BottomNavigation, navigations } from './'

const meta: ComponentMeta<typeof BottomNavigation> = {
  title: 'BottomNavigation',
  component: BottomNavigation,

  args: {
    navigations,
    currentPath: '/'
  }
}

const Template: ComponentStory<typeof BottomNavigation> = (args) => (
  <BottomNavigation {...args} />
)

const Default = Template.bind({})

const ClassName = Template.bind({})

ClassName.args = {
  className: 'fixed bottom-0 inset-x-0 w-full border-t'
}

export default meta
export { Default, ClassName }
