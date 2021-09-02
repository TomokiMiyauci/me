import { ComponentStory, ComponentMeta } from '@storybook/react'

import CommentCounter from './CommentCounter'

const meta: ComponentMeta<typeof CommentCounter> = {
  title: 'CommentCounter',
  component: CommentCounter,

  args: {
    value: 0,
    loading: false
  }
}

const Template: ComponentStory<typeof CommentCounter> = (args) => (
  <CommentCounter {...args} />
)

const Default = Template.bind({})

export default meta
export { Default }
