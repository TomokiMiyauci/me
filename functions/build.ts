import { build } from 'esbuild'
import { dependencies } from './package.json'

const external = Object.keys(dependencies)

const env = process.env.NODE_ENV ?? 'development'
if (env === 'production') {
  console.info('Build for', env)
} else {
  console.log('Build for', env)
}

build({
  entryPoints: ['src/index.ts'],
  external,
  define: {
    'process.env.NODE_ENV': `'${env}'`
  },
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'lib/index.js',
  platform: 'node',
  target: 'node14',
  legalComments: 'none'
})
