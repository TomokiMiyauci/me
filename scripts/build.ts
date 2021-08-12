import { build } from 'esbuild'
import { resolve } from 'path'
build({
  entryPoints: [resolve(__dirname, '..', 'src', 'workers', 'firebase.ts')],
  bundle: true,
  minify: true,
  sourcemap: true,
  watch: process.env.NODE_ENV === 'development',
  outfile: 'static/worker.js',
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
  },
  platform: 'browser',
  legalComments: 'linked'
})

console.log(process.env.NODE_ENV)
