import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ArticleDate from './'

const meta: ComponentMeta<typeof ArticleDate> = {
  title: 'ArticleDate',
  component: ArticleDate,

  args: {
    publishAt: '2021/1/1'
  }
}

const Template: ComponentStory<typeof ArticleDate> = (args) => (
  <ArticleDate {...args} />
)

const Default = Template.bind({})
const Modified = Template.bind({})

Modified.args = {
  modifiedAt: '2021/2/1',
  isModified: true
}

export default meta
export { Default, Modified }
