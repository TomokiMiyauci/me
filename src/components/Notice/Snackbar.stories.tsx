import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Snackbar from '@/components/Notice/Snackbar'

const meta: ComponentMeta<typeof Snackbar> = {
  title: 'Notice/Snackbar',
  component: Snackbar,
  args: {
    children: (
      <span>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio hic
        aliquid voluptate voluptatibus laboriosam, aperiam perspiciatis minima
        voluptas quia nisi eius, obcaecati sequi laborum architecto? Officia hic
        temporibus possimus dolorem!
      </span>
    ),
    type: 'success',
    className: 'max-w-xs'
  },

  argTypes: {
    type: {
      options: ['success', 'info', 'warn', 'alert'],
      control: { type: 'select' } // Automatically inferred when 'options' is defined
    }
  }
}

const Template: ComponentStory<typeof Snackbar> = (args) => (
  <Snackbar {...args} />
)

const Default = Template.bind({})

export default meta
export { Default }
