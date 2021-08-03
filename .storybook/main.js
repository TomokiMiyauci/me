const { register } = require('esbuild-register/dist/node')
register({
  target: 'node16'
})

module.exports = require('./main.ts')
