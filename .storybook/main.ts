import { StorybookConfig, CoreConfig } from '@storybook/core-common'

type WeakenMap<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P]
}

interface ExtendedCoreConfig extends WeakenMap<CoreConfig, 'builder'> {
  builder: 'webpack4' | 'webpack5' | 'storybook-builder-vite'
}

interface ExtendedStorybookConfig extends WeakenMap<StorybookConfig, 'core'> {
  core: ExtendedCoreConfig
}

const config: ExtendedStorybookConfig & { core: { builder: string } } = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite'
  }
}

export default config
