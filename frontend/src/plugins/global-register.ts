import { Plugin } from 'vue'

import MarkdownResolver from '@/components/MarkdownResolver.vue'
import Post from '@/components/Post.vue'

const plugin: Plugin = {
  install: (app) => {
    app.component('Post', Post)
    app.component('MarkdownResolver', MarkdownResolver)
  }
}

export default plugin
