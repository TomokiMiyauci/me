import colors from 'windicss/colors'
import { useEffect } from 'react'
import { first, pipe, tap } from 'fonction'
type Color = { label: string; color: string }

const defaultColor: Color = {
  label: 'cyan',
  color: colors.cyan[500]
}

const colorPalette: Color[] = [
  {
    label: 'pink',
    color: colors.pink[500]
  },
  {
    label: 'red',
    color: colors.red[500]
  },
  {
    label: 'amber',
    color: colors.amber[500]
  },
  {
    label: 'emerald',
    color: colors.emerald[500]
  },
  defaultColor,
  {
    label: 'indigo',
    color: colors.indigo[500]
  },
  { label: 'gray', color: colors.gray[500] }
]

const setProperty = (val: string): void => {
  if (document) {
    document.documentElement.style.setProperty('--accent-color', val)
  }
}

const accentColor = Symbol('accentColor')

const colorPipe = pipe(
  (colorPalette: Color[], label: string) =>
    colorPalette.filter((color) => color.label === label),
  first,

  tap((color) => {
    if (color) {
      setProperty(color.color)
    }
  })
)

const useAccentColor = () => {
  useEffect(() => {
    const label = localStorage.getItem(accentColor.toString())
    if (label) {
      colorPipe(colorPalette, label)
    }
  }, [])

  const switchColor = (color: Color) => {
    localStorage.setItem(accentColor.toString(), color.label)
    setProperty(color.color)
  }

  return { switchColor, colorPalette }
}

export { useAccentColor }
