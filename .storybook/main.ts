import { StorybookConfig } from '@storybook/core-common'
// import { UserConfig } from 'vite'
// import { resolve } from 'path'

// type WeakenMap<T, K extends keyof T> = {
//   [P in keyof T]: P extends K ? any : T[P]
// }

// interface ExtendedCoreConfig extends WeakenMap<CoreConfig, 'builder'> {
//   builder: 'webpack4' | 'webpack5' | 'storybook-builder-vite'
// }

// interface ExtendedStorybookConfig extends WeakenMap<StorybookConfig, 'core'> {
//   core: ExtendedCoreConfig
//   viteFinal?: (config: UserConfig) => UserConfig
// }

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-tailwind-dark-mode'
  ],
  core: {
    builder: 'webpack4'
  },
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    })

    return config
  }
}

export default config
