import _test from 'firebase-functions-test'
import { resolve } from 'path'

const test = _test(
  {
    projectId: 'blorogue-dev'
  },
  resolve(__dirname, '..', '.env.dev.json')
)

export { test }
