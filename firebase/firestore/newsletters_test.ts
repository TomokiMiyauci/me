import {
  initializeTestApp,
  assertFails,
  assertSucceeds
} from '@firebase/rules-unit-testing'

describe('newsletters', () => {
  const app = initializeTestApp({
    projectId: 'test'
  })

  const firestore = app.firestore()

  const collection = firestore.collection('newsletters')
  const email = 'email@test.com'
  const doc = collection.doc(email)

  it('[POST: OK]', async () => {
    await assertSucceeds(
      collection.add({
        email
      })
    )
  })

  it('[OTHER: NG]', async () => {
    await assertFails(doc.get())

    await assertFails(
      doc.set({
        email
      })
    )
    await assertFails(doc.delete())
    await assertFails(
      doc.update({
        email
      })
    )
  })
})
