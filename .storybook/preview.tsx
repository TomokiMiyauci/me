import React from 'react'
import { BaseDecorators } from '@storybook/addons'
const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

const decorators: BaseDecorators<unknown> = [
  (Story) => (
    <div
      className="dark:bg-blue-gray-900 dark:text-gray-200 bg-gray-50 text-gray-700"
      style={{ padding: '2.5rem 0.5rem 2.5rem 0.5rem' }}
    >
      <Story />
    </div>
  )
]

export { parameters, decorators }
import('../assets/global.scss')
import('../assets/prose.scss')
