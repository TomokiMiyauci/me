import { ComponentStory, ComponentMeta } from '@storybook/react'

import Alert from './'

const meta: ComponentMeta<typeof Alert> = {
  title: 'Alert',
  component: Alert,

  args: {
    children: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel aliquam,
        recusandae eum dolor alias laudantium reprehenderit dignissimos et modi
        maiores optio quia ut fuga reiciendis sint sequi. Pariatur, repudiandae
        repellendus.
      </>
    )
  }
}

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />

const Default = Template.bind({})
const Warning = Template.bind({})

Warning.args = {
  type: 'warning'
}

export default meta
export { Default, Warning }
