import { Plugin } from 'vite'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AmpOptimizer = require('@ampproject/toolbox-optimizer')
const ampOptimizer = AmpOptimizer.create({
  minify: false,
  markdown: true
})
import { OutputAsset, OutputChunk } from 'rollup'

const transformer = ([, value]: [string, OutputAsset | OutputChunk]): readonly [
  RegExp,
  string
] => {
  const { fileName } = value
  if (fileName.endsWith('.css') && value.type === 'asset') {
    const reCSS = new RegExp(
      `<link rel="stylesheet"[^>]*?href="/${fileName}"[^>]*?>`
    )

    const code = `<style amp-custom>
      ${(value as OutputAsset).source.toString()}
    </style>`

    return [reCSS, code] as const
  } else if ((value as OutputChunk)?.code) {
    const reScript = new RegExp(
      `<script type="module"[^>]*?src="/${fileName}"[^>]*?></script>|<link rel="modulepreload"[^>]*?href="/${fileName}">`
    )
    const c = ``
    return [reScript, c]
  }

  return [] as any
}

const plugin: Plugin = {
  name: 'vite:amp',
  config: ({ build }) => ({
    build: {
      cssCodeSplit: false
    },
    ssgOptions: {
      onPageRendered: (_, html) => {
        html = html.replace(
          `<script type="module"[^>]*?src="/${
            build?.assetsDir || 'assets'
          }/.*/.js"[^>]*? />|<link rel="modulepreload"[^>].*href="/${
            build?.assetsDir || 'assets'
          }/.*/.js">`,
          ''
        )

        return ampOptimizer.transformHtml(html)
      }
    }
  }),

  transform: (code, id, ssr) => {
    if (!ssr) {
      if (id.endsWith('.scss') && code && typeof code === 'string') {
        code = code.replaceAll(' !important', '')
      }
    }
    return code
  },

  transformIndexHtml: {
    enforce: 'post',
    transform: async (html, a) => {
      if (!a.bundle) return html

      const t = Object.entries(a.bundle).map(transformer)

      t.forEach(([regex, val]) => {
        html = html.replace(regex, val)
      })

      return html
    }
  }
}

export default () => plugin
