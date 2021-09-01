import { ComponentStory, ComponentMeta } from '@storybook/react'

import ArticleHeadlineBody from '@/components/ArticleHeadline/ArticleHeadlineBody'

const meta: ComponentMeta<typeof ArticleHeadlineBody> = {
  title: 'ArticleHeadlineBody',
  component: ArticleHeadlineBody,
  args: {
    title:
      'This is title lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, eius dolorum culpa autem aut quis? Praesentium illum eius commodi fuga ipsum, eveniet expedita architecto, delectus at alias placeat est cum.',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, eius dolorum culpa autem aut quis? Praesentium illum eius commodi fuga ipsum, eveniet expedita architecto, delectus at alias placeat est cum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, eius dolorum culpa autem aut quis? Praesentium illum eius commodi fuga ipsum, eveniet expedita architecto, delectus at alias placeat est cum.',
    tags: ['vite', 'typescript'],
    readingTime: '3 min read',
    lastUpdated: '2021/01/01'
  }
}

const Template: ComponentStory<typeof ArticleHeadlineBody> = (args) => (
  <ArticleHeadlineBody {...args} />
)

const Default = Template.bind({})
const NoTags = Template.bind({})
const NoReadingTime = Template.bind({})

NoTags.args = {
  tags: []
}

NoReadingTime.args = {
  readingTime: undefined
}

export default meta
export { Default, NoTags, NoReadingTime }
