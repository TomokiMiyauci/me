import { build } from 'esbuild'
import { resolve } from 'path'

const basedir = resolve(__dirname, '..', 'src', 'workers')

build({
  entryPoints: [resolve(basedir, 'index.ts')],
  format: 'esm',
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: resolve(basedir, 'index.js'),
  legalComments: 'external'
})
