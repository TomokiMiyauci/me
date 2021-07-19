import {
  parseCodeBlockHeader,
  parseLanguage,
  parseBlockName,
  defaultSetter,
  lineNumbers,
  range
} from './code_block'

describe('parseLanguage', () => {
  const table: [string, string][] = [
    ['', ''],
    ['language-ts', 'ts'],
    ['language-ts:file.ts', 'ts:file.ts'],
    ['language-ts:file.ts{1,2}', 'ts:file.ts{1,2}']
  ]
  it.each(table)('parseLanguage(%s) -> %s', (val, expected) => {
    expect(parseLanguage(val)).toBe(expected)
  })
})

describe('parseBlockName', () => {
  const table: [
    string,
    {
      [key: string]: string
    }
  ][] = [
    ['', {}],
    ['ts', { ext: 'ts' }],
    ['ts:filepath.ts', { ext: 'ts', filePath: 'filepath.ts' }],
    ['ts:src/filepath.ts', { ext: 'ts', filePath: 'src/filepath.ts' }],

    [
      'ts:filepath.ts{1}',
      { ext: 'ts', filePath: 'filepath.ts', highlights: '1' }
    ],
    [
      'ts:filepath.ts{15}',
      { ext: 'ts', filePath: 'filepath.ts', highlights: '15' }
    ],
    [
      'ts:filepath.ts{1,2}',
      { ext: 'ts', filePath: 'filepath.ts', highlights: '1,2' }
    ],
    [
      'ts:filepath.ts{1,2,3,4}',
      { ext: 'ts', filePath: 'filepath.ts', highlights: '1,2,3,4' }
    ],
    [
      'ts:filepath.ts{1-3}',
      { ext: 'ts', filePath: 'filepath.ts', highlights: '1-3' }
    ],
    [
      'ts:filepath.ts{1-3,5,6}',
      { ext: 'ts', filePath: 'filepath.ts', highlights: '1-3,5,6' }
    ],

    ['ts', { ext: 'ts' }],
    ['ts:filepath.ts', { ext: 'ts', filePath: 'filepath.ts' }],
    ['ts{1}', { ext: 'ts', highlights: '1' }],
    ['ts{1,2}', { ext: 'ts', highlights: '1,2' }],
    ['ts{1,2,4-6}', { ext: 'ts', highlights: '1,2,4-6' }],
    [
      'ts:filePath.ts{1,2,4-6}',
      { ext: 'ts', filePath: 'filePath.ts', highlights: '1,2,4-6' }
    ],
    [
      'ts:file-path.ts{1,2,4-6}',
      { ext: 'ts', filePath: 'file-path.ts', highlights: '1,2,4-6' }
    ]
  ]
  it.each(table)('parseBlockName(%s) -> %s', (val, expected) => {
    expect(parseBlockName(val)).toEqual(expected)
  })
})

describe('defaultSetter', () => {
  const table: [
    {
      [key: string]: string
    },
    { ext: string; filePath: string; highlights: string }
  ][] = [
    [{}, { ext: '', filePath: '', highlights: '' }],
    [
      { ext: 'ts', highlights: '1,2,4-6' },
      {
        ext: 'ts',
        highlights: '1,2,4-6',
        filePath: ''
      }
    ],
    [
      { ext: 'ts', filePath: 'filePath.ts', highlights: '1,2,4-6' },
      { ext: 'ts', filePath: 'filePath.ts', highlights: '1,2,4-6' }
    ]
  ]
  it.each(table)('defaultSetter(%s) -> %s', (val, expected) => {
    expect(defaultSetter(val)).toEqual(expected)
  })
})

describe('lineNumbers', () => {
  const table: [string, number[]][] = [
    ['', []],
    ['1', [1]],
    ['1-3', [1, 2, 3]],
    ['1-3,4', [1, 2, 3, 4]],
    ['1-3,4-6', [1, 2, 3, 4, 5, 6]],
    ['1-3,4-6,10,11,12', [1, 2, 3, 4, 5, 6, 10, 11, 12]],
    ['1-3,4-6,5,5', [1, 2, 3, 4, 5, 6, 5, 5]]
  ]
  it.each(table)('lineNumbers(%s) -> %s', (val, expected) => {
    expect(lineNumbers(val)).toEqual(expected)
  })
})

describe('range', () => {
  const table: [number, number, number[]][] = [
    [1, 3, [1, 2, 3]],
    [1, 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]
  ]
  it.each(table)('range(%d, %d) -> %s', (a, b, expected) => {
    expect(range(a, b)).toEqual(expected)
  })
})

describe('parseCodeBlockHeader', () => {
  const table: [
    string,
    {
      ext: string
      filePath: string
      highlights: number[]
    }
  ][] = [
    ['', { ext: '', filePath: '', highlights: [] }],
    ['ts', { ext: 'ts', filePath: '', highlights: [] }],
    ['ts{1,2,3}', { ext: 'ts', filePath: '', highlights: [1, 2, 3] }],
    ['ts:filepath.ts', { ext: 'ts', filePath: 'filepath.ts', highlights: [] }],
    [
      'ts:filepath.ts{1,2,3}',
      { ext: 'ts', filePath: 'filepath.ts', highlights: [1, 2, 3] }
    ],
    [
      'json:filepath.json{1,2,3,5-8}',
      {
        ext: 'json',
        filePath: 'filepath.json',
        highlights: [1, 2, 3, 5, 6, 7, 8]
      }
    ],
    [
      'json:src/filepath.json{1,2,3,5-8}',
      {
        ext: 'json',
        filePath: 'src/filepath.json',
        highlights: [1, 2, 3, 5, 6, 7, 8]
      }
    ],
    [
      'json:src/file-path.json{1,2,3,5-8}',
      {
        ext: 'json',
        filePath: 'src/file-path.json',
        highlights: [1, 2, 3, 5, 6, 7, 8]
      }
    ]
  ]
  it.each(table)('parseCodeBlockHeader(%s) -> %s', (val, expected) => {
    expect(parseCodeBlockHeader(`language-${val}`)).toEqual(expected)
  })
})
