const varAccentColor = 'var(--accent-color)'
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['src/**/*.{js,ts,tsx}', 'config/**.ts'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        pink: colors.pink,
        fuchsia: colors.fuchsia,
        purple: colors.purple,
        violet: colors.violet,
        indigo: colors.indigo,
        blue: colors.blue,
        sky: colors.sky,
        cyan: colors.cyan,
        teal: colors.teal,
        emerald: colors.emerald,
        green: colors.green,
        lime: colors.lime,
        yellow: colors.yellow,
        amber: colors.amber,
        orange: colors.orange,
        red: colors.red,
        'warm-gray': colors.warmGray,
        'true-gray': colors.trueGray,
        gray: colors.gray,
        'cool-gray': colors.coolGray,
        'blue-gray': colors.blueGray,
        grey: '#282c34',
        accent: varAccentColor
      },
      typography: {
        DEFAULT: {
          css: {
            color: false,
            blockquote: {
              color: false,
              marginInlineStart: '0.5rem',
              marginInlineEnd: '0.5rem',
              paddingLeft: '0.75rem',
              borderLeftColor: varAccentColor
            },
            a: {
              color: varAccentColor,
              textDecoration: 'none'
            },
            'a code': {
              color: varAccentColor
            },
            'a:hover': {
              '-webkit-text-decoration-line': 'underline',
              'text-decoration-line': 'underline'
            },
            pre: false,
            code: {
              color: false,
              fontWeight: '500',
              backgroundColor: false,
              whiteSpace: 'nowrap',
              borderRadius: '0.375rem',
              marginLeft: '0.25rem',
              marginRight: '0.25rem',
              padding: '0.25rem'
            },
            img: {
              boxShadow:
                '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);',
              borderRadius: '0.375rem',
              marginTop: '1rem',
              marginBottom: '1rem'
            },
            h1: {
              color: false
            },
            h2: {
              color: false
            },
            h3: {
              color: false
            },
            h4: {
              color: false
            },
            h5: {
              color: false
            },
            h6: {
              color: false
            },
            'ul > li': false,
            'ul > li::before': false,
            'code::before': false,
            'code::after': false,
            'pre code': false,
            table: {
              marginTop: 0,
              marginBottom: 0,
              borderCollapse: 'collapse',
              borderRadius: '0.375rem'
            },
            thead: {
              backgroundColor: false,
              color: false,
              borderBottomColor: false
            },
            'thead th': {
              padding: '0.25rem 0.5rem',
              whiteSpace: 'nowrap'
            },
            'tbody tr': {
              borderBottomColor: false
            },
            'tbody td': {
              whiteSpace: 'nowrap'
            },
            'thead th:first-child': false,
            'tbody td:first-child': false,
            'tbody td:last-child': false
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
    require('tailwindcss-hero-patterns')
  ]
}
