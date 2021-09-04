import admin from 'firebase-admin'
import { replace } from 'core-fn'
import { wait } from '../src/utils/time'

type Awaited<T extends Promise<any>> = T extends Promise<infer R> ? R : never

const initializeApp = (clientEmail: string, privateKey: string) =>
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail,
      privateKey,
      projectId: 'blorogue'
    })
  })

const pretty = replace(/\\n/g, '\n')

const sequence = <T extends () => Promise<unknown>>(fn: T) => {
  let hasCalled = false
  let done = false
  let result: any = undefined

  return (): Promise<Awaited<ReturnType<T>>> => {
    return new Promise<Awaited<ReturnType<T>>>(async (resolve) => {
      if (hasCalled) {
        while (!done) {
          await wait(500)
        }
        return resolve(result)
      } else {
        hasCalled = true
        console.log('called')

        const data = await fn()
        result = data
        done = true

        resolve(data as Awaited<ReturnType<T>>)
      }
    })
  }
}
export { initializeApp, pretty, wait, sequence }
