import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProgressBar from './ProgressBar'

const meta: ComponentMeta<typeof ProgressBar> = {
  title: 'ProgressBar',
  component: ProgressBar,

  args: {
    max: 1000,
    val: 0
  }
}

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
)

const Default = Template.bind({})

export default meta
export { Default }
