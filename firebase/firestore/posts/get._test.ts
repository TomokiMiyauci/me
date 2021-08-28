import { initializeTestApp, assertSucceeds } from '@firebase/rules-unit-testing'

describe('posts/{slug}', () => {
  it('OK', async () => {
    const uid = 'anonymous'
    const app = initializeTestApp({
      projectId: 'test',
      auth: {
        uid
      }
    })

    await assertSucceeds(app.firestore().collection('posts').doc('slug').get())
  })
})
