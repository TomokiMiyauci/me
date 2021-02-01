import { Plugin } from 'vue'

import Post from '@/components/Post.vue'
import Posts from '@/components/Posts.vue'

const plugin: Plugin = {
  install: (app) => {
    app.component('Post', Post)
    app.component('Posts', Posts)
  }
}

export default plugin
