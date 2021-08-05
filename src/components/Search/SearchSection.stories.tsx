import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchSection from '@/components/Search/SearchSection'

const meta: ComponentMeta<typeof SearchSection> = {
  title: 'Search/SearchSection',
  component: SearchSection
}

const Template: ComponentStory<typeof SearchSection> = (args) => (
  <SearchSection {...args} />
)

const Default = Template.bind({})

export default meta
export { Default }
