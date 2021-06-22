import { useEffect } from 'react'
import { first, pipe, tap } from 'fonction'
type Color = { label: string; color: string }

const defaultColor: Color = {
  label: 'cyan',
  color: '#06B6D4'
}

const colorPalette: Color[] = [
  {
    label: 'pink',
    color: '#EC4899'
  },
  {
    label: 'red',
    color: '#EF4444'
  },
  {
    label: 'amber',
    color: '#F59E0B'
  },
  {
    label: 'emerald',
    color: '#10B981'
  },
  defaultColor,
  {
    label: 'indigo',
    color: '#6366F1'
  },
  { label: 'gray', color: '#71717A' }
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
