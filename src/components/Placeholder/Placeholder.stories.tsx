import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Placeholder from './'

const meta: ComponentMeta<typeof Placeholder> = {
  title: 'Placeholder',
  component: Placeholder,

  args: {
    children: <div>This is main</div>,
    placeholder: <div>This is placeholder</div>,
    placeholding: false
  }
}

const Template: ComponentStory<typeof Placeholder> = (args) => (
  <Placeholder {...args} />
)

const Default = Template.bind({})

export default meta
export { Default }
