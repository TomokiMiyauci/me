/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('windicss/colors')
const typography = require('windicss/plugin/typography')

module.exports = {
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
    width: ['responsive', 'hover']
  },

  plugins: [typography]
}
