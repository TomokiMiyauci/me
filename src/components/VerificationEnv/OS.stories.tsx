import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import OS from '@/components/VerificationEnv/OS'
import { DEFAULT_OS } from '@/components/VerificationEnv/constants'

const meta: ComponentMeta<typeof OS> = {
  title: 'OS',
  component: OS,

  args: DEFAULT_OS
}

const Template: ComponentStory<typeof OS> = (args) => <OS {...args} />

const Default = Template.bind({})

export default meta
export { Default }
