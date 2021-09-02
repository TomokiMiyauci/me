import { ComponentStory, ComponentMeta } from '@storybook/react'

import ArticleHeadline from '@/components/ArticleHeadline/ArticleHeadline'
import { Icon } from '@iconify/react/dist/offline'
import heart from '@iconify-icons/mdi/heart'

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
        alt="placeholder"
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

const date = Template.bind({})

date.args = {
  Area: (
    <span className="group-hover:opacity-40 transition-opacity duration-300 opacity-20 text-gray-400 dark:text-blue-gray-400 transform rotate-180 text-6xl md:text-7xl writing-mode-vertical">
      Aug
    </span>
  )
}
const view = Template.bind({})
const like = Template.bind({})

view.args = {
  Area: (
    <span className="text-7xl text-right group-hover:opacity-40 transition-opacity duration-300 opacity-20 text-gray-400 dark:text-blue-gray-400">
      01
    </span>
  )
}

like.args = {
  Area: (
    <Icon
      icon={heart}
      className="w-24 h-24 text-pink-500 opacity-50 group-hover:text-accent transition-colors duration-[1500ms]"
    />
  )
}

export default meta
export { Default, date, view, like }
