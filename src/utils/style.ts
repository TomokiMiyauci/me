const unit = (val: string, unit: 'px'): `${string}px` => `${val}${unit}`
const parenthesis = (val: string): `(${string})` => `(${val})`

export { unit, parenthesis }
