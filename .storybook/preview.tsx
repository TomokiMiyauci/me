import React from 'react'
import { BaseDecorators } from '@storybook/addons'
import { action } from '@storybook/addon-actions'

global.___loader = {
  enqueue: () => {},
  hovering: () => {}
}
global.__BASE_PATH__ = '/'
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname)
}
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

import('../assets/global.scss')
import('../assets/prose.scss')

export { parameters, decorators }
