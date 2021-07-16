import darkMode from 'use-dark-mode'
import { useContext } from 'react'
import DarkModeContext from '@/contexts/dark_mode'

const useDarkModeProvider = () =>
  darkMode(undefined, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })

const useDarkMode = () => useContext(DarkModeContext)

export { useDarkModeProvider, useDarkMode }
