import darkMode from 'use-dark-mode'
import { useContext, useEffect } from 'react'
import DarkModeContext from '../contexts/dark_mode'

const switchTweetTheme = (currentTheme: 'dark' | 'light') => {
  const tweets = document.querySelectorAll('[data-tweet-id]')

  tweets.forEach((tweet) => {
    const src = tweet.getAttribute('src')
    if (!src) return
    tweet.setAttribute(
      'src',
      src.replace(/&theme=.*&/, `&theme=${currentTheme}&`)
    )
  })
}

const useDarkModeProvider = () => {
  const { value, ...rest } = darkMode(undefined, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })

  useEffect(() => {
    setTimeout(() => {
      switchTweetTheme(value ? 'dark' : 'light')
    }, 1000)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      switchTweetTheme(value ? 'dark' : 'light')
    }, 300)
  }, [value])

  return {
    value,
    ...rest
  }
}

const useDarkMode = () => useContext(DarkModeContext)

export { useDarkModeProvider, useDarkMode }
