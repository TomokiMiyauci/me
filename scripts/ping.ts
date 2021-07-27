import fetch from 'node-fetch'

const SITEMAP_URL = 'https://miyauchi.dev/sitemap/sitemap-index.xml'
const BASE_URL = 'https://www.google.com/'

const searchParams = new URLSearchParams({
  sitemap: SITEMAP_URL
})

const url = new URL('ping', BASE_URL)

url.search = searchParams.toString()

const main = () => {
  fetch(url).catch((e) => {
    console.error(e)
  })
}

main()
