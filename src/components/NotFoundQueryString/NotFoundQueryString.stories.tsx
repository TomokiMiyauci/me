import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import NotFoundQueryString from '.'

const meta: ComponentMeta<typeof NotFoundQueryString> = {
  title: 'NotFoundQueryString',
  component: NotFoundQueryString
}

const Template: ComponentStory<typeof NotFoundQueryString> = (args) => (
  <NotFoundQueryString {...args} />
)

const Default = Template.bind({})

Default.args = {
  query: 'test'
}

export default meta
export { Default }
