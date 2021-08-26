import { build } from 'esbuild'
import { resolve } from 'path'
import { move } from 'fs-extra'

const rootDir = resolve(__dirname, '..')
const srcDir = resolve(rootDir, 'src', 'workers')
const fileName = 'append_script'
const LEGAL_SUFFIX = '.LEGAL.txt'
const JS_SUFFIX = '.js'
const MAP_SUFFIX = '.map'

const run = async () => {
  await build({
    entryPoints: [resolve(srcDir, `${fileName}.ts`)],
    format: 'esm',
    bundle: true,
    minify: true,
    sourcemap: true,
    define: {
      'process.env.NODE_ENV': `'${process.env.NODE_ENV ?? 'development'}'`,
      'process.env.GATSBY_STAGE': `'${process.env.GATSBY_STAGE ?? 'dev'}'`
    },
    outfile: resolve(srcDir, `${fileName}${JS_SUFFIX}`),
    legalComments: 'external'
  })

  if (process.env.NODE_ENV === 'development') {
    move(
      resolve(srcDir, `${fileName}${JS_SUFFIX}`),
      resolve(rootDir, 'static', `${fileName}${JS_SUFFIX}`),
      { overwrite: true }
    )
  }

  move(
    resolve(srcDir, `${fileName}${JS_SUFFIX}${MAP_SUFFIX}`),
    resolve(rootDir, 'static', `${fileName}${JS_SUFFIX}${MAP_SUFFIX}`),
    { overwrite: true }
  )

  move(
    resolve(srcDir, `${fileName}${JS_SUFFIX}${LEGAL_SUFFIX}`),
    resolve(rootDir, 'static', `${fileName}${JS_SUFFIX}${LEGAL_SUFFIX}`),
    { overwrite: true }
  )
}

run()
