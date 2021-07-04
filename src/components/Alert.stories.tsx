import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Alert from './Alert'

const meta: ComponentMeta<typeof Alert> = {
  title: 'Alert',
  component: Alert,

  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

export default meta

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: <div>This is alert</div>
}
