/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path')
const BASE_DIR = join(__dirname, 'src')
const VUE_FILE = join('**', '*.vue')
const TS_FILE = join('**', '*.ts')
const typography = require('@tailwindcss/typography')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      join(BASE_DIR, VUE_FILE),
      join(BASE_DIR, TS_FILE),
      join(__dirname, '*.html')
    ],
    options: {
      safelist: ['prose', 'prose-sm', 'm-auto']
    }
  },
  darkMode: 'media',
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [typography]
}
