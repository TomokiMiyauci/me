import colors from 'windicss/colors'
import { useState } from 'react'

type Color = { label: string; color: string }

const defaultColor: Color = {
  label: 'cyan',
  color: colors.cyan[500]
}

const colorParet: Color[] = [
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

const useAccentColor = () => {
  const [currentColor, changeColor] = useState(defaultColor)
  const switchColor = (color: Color) => {
    document.documentElement.style.setProperty('--accent-color', color.color)
    changeColor(color)
  }

  return { switchColor, currentColor, colorParet }
}

export { useAccentColor }
