/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path')
const BASE_DIR = join(__dirname, 'src')
const VUE_FILE = join('**', '*.vue')
const TS_FILE = join('**', '*.ts')
const typography = require('@tailwindcss/typography')
const colors = require('tailwindcss/colors')

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
    extend: {
      colors: {
        teal: colors.teal
      },

      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
        '10xl': '8rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [typography]
}
