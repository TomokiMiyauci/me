import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Newsletter from './Newsletter'

const meta: ComponentMeta<typeof Newsletter> = {
  title: 'Newsletter',
  component: Newsletter
}

const Template: ComponentStory<typeof Newsletter> = (args) => (
  <Newsletter {...args} />
)

const Default = Template.bind({})
const Pending = Template.bind({})

Pending.args = {
  pending: true
}

export default meta
export { Default, Pending }
