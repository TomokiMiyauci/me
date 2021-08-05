import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Browser from '@/components/VerificationEnv/Browser'

const meta: ComponentMeta<typeof Browser> = {
  title: 'Browser',
  component: Browser
}

const Template: ComponentStory<typeof Browser> = (args) => <Browser {...args} />

const Default = Template.bind({})

export default meta
export { Default }
