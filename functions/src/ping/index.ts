import functions from 'firebase-functions'
import fetch from 'node-fetch'

const onCreateMetaPostJaPing = functions
  .region('asia-northeast1')
  .runWith({
    memory: '128MB'
  })
  .firestore.document('meta/{slug}/locales/ja')
  .onCreate(() => {
    const SITEMAP_URL = 'https://miyauchi.dev/sitemap/sitemap-index.xml'
    const BASE_URL = 'https://www.google.com/'

    const searchParams = new URLSearchParams({
      sitemap: SITEMAP_URL
    })

    const url = new URL('ping', BASE_URL)

    url.search = searchParams.toString()
    return fetch(url)
  })

export { onCreateMetaPostJaPing }
