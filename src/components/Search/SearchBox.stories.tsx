import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchBox from '@/components/Search/SearchBox'

const meta: ComponentMeta<typeof SearchBox> = {
  title: 'Search/SearchBox',
  component: SearchBox
}

const Template: ComponentStory<typeof SearchBox> = (args) => (
  <SearchBox {...args} />
)

const Default = Template.bind({})

export default meta
export { Default }
