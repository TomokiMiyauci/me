import { StorybookConfig } from '@storybook/core-common'
import { resolve } from 'path'

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-tailwind-dark-mode',
    '@storybook/addon-a11y'
  ],
  core: {
    builder: 'webpack4'
  },
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    })

    config.module.rules[0].exclude = [
      /node_modules\/(?!(gatsby|gatsby-theme-i18n)\/)/
    ]
    config.resolve.alias = {
      '@': resolve(__dirname, '..', 'src')
    }
    config.module.rules[0].use[0].loader = require.resolve('babel-loader')
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env')
    ]
    config.module.rules[0].use[0].options.plugins = [
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('babel-plugin-remove-graphql-queries')
    ]
    config.resolve.mainFields = ['module', 'main']

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
        plugins: [
          require.resolve('@babel/plugin-proposal-class-properties'),
          require.resolve('babel-plugin-remove-graphql-queries')
        ]
      }
    })
    config.resolve.extensions.push('.ts', '.tsx')

    return config
  }
}

export default config
