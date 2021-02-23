/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
import urlJoin from 'url-join'
import { Plugin } from 'vue'

function register(
  c: any,
  l: Document,
  a: string,
  r: string,
  i: string,
  t?: any,
  y?: any
) {
  c[a] =
    c[a] ||
    function () {
      ;(c[a].q = c[a].q || []).push(arguments)
    }
  t = l.createElement(r)
  t.async = 1
  t.src = urlJoin('https://www.clarity.ms/tag/', i)
  y = l.getElementsByTagName(r)[0]
  y.parentNode.insertBefore(t, y)
}
const plugin: Plugin = {
  install: () => {
    if (!import.meta.env.PROD || !window || !document) return

    register(window, document, 'clarity', 'script', '5ipdtj3l7s')
  }
}

export default plugin
