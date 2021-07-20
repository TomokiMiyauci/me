import { StorybookConfig, CoreConfig, Options } from '@storybook/core-common'
import { UserConfig } from 'vite'
import { Weaken } from 'utilitypes'
import { resolve } from 'path'
interface CustomizedCoreConfig extends Weaken<CoreConfig, 'builder'> {
  builder: CoreConfig['builder'] | 'storybook-builder-vite'
}
interface CustomizedStorybookConfig extends Weaken<StorybookConfig, 'core'> {
  core: CustomizedCoreConfig
  viteFinal?: (config: UserConfig, options: Options) => UserConfig
}

const config: CustomizedStorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-dark-mode'
  ],
  core: {
    builder: 'storybook-builder-vite'
  },
  viteFinal: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.build.chunkSizeWarningLimit = 1700
    }

    config.resolve.alias = {
      '@': resolve(__dirname, '..', 'src')
    }

    return config
  }
}

export default config
