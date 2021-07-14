import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Snackbar from './Snackbar'
import info from '@iconify-icons/mdi/info-circle'

const meta: ComponentMeta<typeof Snackbar> = {
  title: 'Snackbar',
  component: Snackbar,
  args: {
    field: (
      <span className="flex items-center">
        Send you a email. please check it.
      </span>
    ),
    icon: info,
    isShow: true
  }
}

const Template: ComponentStory<typeof Snackbar> = (args) => (
  <Snackbar {...args} />
)

const Default = Template.bind({})
const ClassName = Template.bind({})

ClassName.args = {
  className: 'fixed bottom-0 left-0'
}

export default meta
export { Default, ClassName }
