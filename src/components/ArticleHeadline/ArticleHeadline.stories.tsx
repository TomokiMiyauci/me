import { ComponentStory, ComponentMeta } from '@storybook/react'

import ArticleHeadline from '@/components/ArticleHeadline/ArticleHeadline'

const meta: ComponentMeta<typeof ArticleHeadline> = {
  title: 'ArticleHeadline',
  component: ArticleHeadline,
  args: {
    title:
      'This is title lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, eius dolorum culpa autem aut quis? Praesentium illum eius commodi fuga ipsum, eveniet expedita architecto, delectus at alias placeat est cum.',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, eius dolorum culpa autem aut quis? Praesentium illum eius commodi fuga ipsum, eveniet expedita architecto, delectus at alias placeat est cum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, eius dolorum culpa autem aut quis? Praesentium illum eius commodi fuga ipsum, eveniet expedita architecto, delectus at alias placeat est cum.',
    Img: (
      <img
        className="m-2 sm:m-3 rounded overflow-visible"
        src="http://placehold.jp/80x80.png"
        width="80"
        height="80"
      />
    ),
    tags: ['vite', 'typescript'],
    readingTime: '3 min read',
    lastUpdated: '2021/01/01'
  }
}

const Template: ComponentStory<typeof ArticleHeadline> = (args) => (
  <ArticleHeadline {...args} />
)

const Default = Template.bind({})

const MMM = Template.bind({})
const No = Template.bind({})

MMM.args = {
  MMM: 'Aug'
}

No.args = {
  no: 1
}

export default meta
export { Default, MMM, No }
