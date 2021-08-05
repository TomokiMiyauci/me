import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Package from '@/components/VerificationEnv/Package'

const meta: ComponentMeta<typeof Package> = {
  title: 'Package',
  component: Package,

  args: {
    node: [
      {
        name: 'fonction',
        version: '2.0.0'
      }
    ]
  }
}

const Template: ComponentStory<typeof Package> = (args) => <Package {...args} />

const Default = Template.bind({})

export default meta
export { Default }
