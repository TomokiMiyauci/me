import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import IconTextLink from './'
import home from '@iconify-icons/mdi/home'

const meta: ComponentMeta<typeof IconTextLink> = {
  title: 'IconTextLink',
  component: IconTextLink,

  args: {
    title: 'Home',
    to: '/',
    isActive: false,
    icon: home
  }
}

const Template: ComponentStory<typeof IconTextLink> = (args) => (
  <IconTextLink {...args} />
)

const Default = Template.bind({})

export default meta
export { Default }
