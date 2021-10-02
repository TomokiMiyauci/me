type Color = { label: string; color: string }

const defaultColor: Color = {
  label: 'cyan',
  color: '#06B6D4'
}

const accentColor = Symbol('accentColor')
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

const pickColor = (colorLabel: string): Color =>
  colorPalette.filter(({ label }) => label === colorLabel)[0]

const switchColor = ({ label, color }: Color): void => {
  localStorage.setItem(accentColor.toString(), label)
  safeSetProperty(color)
}

const setAccentColor = (): void => {
  const colorLabel = window.localStorage.getItem(accentColor.toString())
  const { color } = colorLabel ? pickColor(colorLabel) : defaultColor
  safeSetProperty(color)
}

const safeSetProperty = (val: string): void => {
  if (!document) return
  document.documentElement.style.setProperty('--accent-color', val)
}

export { setAccentColor, switchColor, colorPalette }
