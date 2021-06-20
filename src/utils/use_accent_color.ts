import colors from 'windicss/colors'

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

const useAccentColor = () => {
  const switchColor = (color: Color) => {
    document.documentElement.style.setProperty('--accent-color', color.color)
  }

  return { switchColor, colorPalette }
}

export { useAccentColor }
