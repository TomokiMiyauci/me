import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Clap from './Clap'

const meta: ComponentMeta<typeof Clap> = {
  title: 'Clap',
  component: Clap,

  args: {
    clap: 0
  }
}

const Template: ComponentStory<typeof Clap> = (args) => <Clap {...args} />

const Default = Template.bind({})

export default meta
export { Default }
