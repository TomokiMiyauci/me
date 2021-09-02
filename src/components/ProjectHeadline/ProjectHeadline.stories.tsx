import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProjectHeadline from '@/components/ProjectHeadline/ProjectHeadline'

const meta: ComponentMeta<typeof ProjectHeadline> = {
  title: 'ProjectHeadline',
  component: ProjectHeadline,

  args: {
    title: 'fonction',
    description: 'A modern practical functional library',
    type: 'universal',
    className: 'max-w-sm'
  }
}

const Template: ComponentStory<typeof ProjectHeadline> = (args) => (
  <ProjectHeadline {...args} />
)

const Default = Template.bind({})

export default meta
export { Default }
