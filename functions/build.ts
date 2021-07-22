import { build } from 'esbuild'
import { dependencies } from './package.json'

const external = Object.keys(dependencies)

build({
  entryPoints: ['src/index.ts'],
  external,
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'lib/index.js',
  platform: 'node',
  target: 'node14'
})
