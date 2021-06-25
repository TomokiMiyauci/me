import { replace, exec } from 'core-fn'
import { pipe, first, last } from 'fonction'
import { Language } from 'prism-react-renderer'
import { isEmpty } from '@miyauci/is-valid'

const parseLanguage = replace(/^language-/, '')
const parseBlockName = pipe(
  exec(/^(?<ext>[a-z]+)(:(?<filePath>[\w\.\/]*))?({(?<highlights>[\d,-]+)\})?/),
  (RegExpExecArray) => RegExpExecArray?.groups || {}
)
const defaultSetter = ({
  ext,
  filePath,
  highlights
}: {
  [key: string]: string
}): { ext: string; filePath: string; highlights: string } => ({
  ext: ext ?? '',
  filePath: filePath ?? '',
  highlights: highlights ?? ''
})

const range = (a: number, b: number): number[] =>
  Array(b - a + 1)
    .fill(null)
    .map((_, i) => i + a)

const lineNumbers = (val: string): number[] =>
  isEmpty(val)
    ? []
    : pipe((val: string) =>
        val
          .split(',')
          .map((v) => {
            const splitted = v.split('-')
            return range(
              pipe(first, Number)(splitted),
              pipe(last, Number)(splitted)
            )
          })
          .flat()
      )(val)

const parseCodeBlockHeader = pipe(
  parseLanguage,
  parseBlockName,
  defaultSetter,
  ({ ext, filePath, highlights }) => ({
    ext,
    filePath,
    highlights: lineNumbers(highlights)
  })
)

const languageMap = (val: string): Language => {
  switch (val) {
    case 'ts': {
      return 'typescript'
    }
    case 'js': {
      return 'javascript'
    }

    case 'md': {
      return 'markdown'
    }

    default: {
      return val as Language
    }
  }
}

export {
  parseCodeBlockHeader,
  languageMap,
  parseLanguage,
  parseBlockName,
  defaultSetter,
  lineNumbers,
  range
}
