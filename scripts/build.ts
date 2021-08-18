import { build } from 'esbuild'
import { resolve } from 'path'
import { move } from 'fs-extra'

const rootDir = resolve(__dirname, '..')
const srcDir = resolve(rootDir, 'src', 'workers')
const fileName = 'append_script.js'
const LEGAL_SUFFIX = '.LEGAL.txt'
const MAP_SUFFIX = '.map'

const run = async () => {
  await build({
    entryPoints: [resolve(srcDir, 'index.ts')],
    format: 'esm',
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: resolve(srcDir, fileName),
    legalComments: 'external'
  })

  move(
    resolve(srcDir, `${fileName}${MAP_SUFFIX}`),
    resolve(rootDir, 'static', `${fileName}${MAP_SUFFIX}`),
    { overwrite: true }
  )

  move(
    resolve(srcDir, `${fileName}${LEGAL_SUFFIX}`),
    resolve(rootDir, 'static', `${fileName}${LEGAL_SUFFIX}`),
    { overwrite: true }
  )
}

run()
