import admin from 'firebase-admin'
import { configure } from 'eta'
import * as functions from 'firebase-functions'
import type { RuntimeOptions, FunctionBuilder } from 'firebase-functions'
import { DEFAULT_RUNTIME_OPTIONS } from '@/constants'
/**
 * Setup global environment
 */
const setup = (): void => {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })

  configure({
    views: 'views'
  })
}

/**
 * Create firebase-function function with default parameters.
 * @param runtimeOptions - firebase-functions runtime options
 * @param regions - firebase-functions region
 * @returns `FunctionBuilder`
 *
 * @public
 */
const createFunctions = (
  runtimeOptions: RuntimeOptions = DEFAULT_RUNTIME_OPTIONS,
  ...regions: string[]
): FunctionBuilder =>
  functions.region('asia-northeast1').runWith(runtimeOptions)

const switchable = <T>(production: T, development: T): T => {
  switch (process.env.NODE_ENV) {
    case 'production': {
      return production
    }

    default: {
      return development
    }
  }
}

export { setup, createFunctions, switchable }
