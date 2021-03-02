import { Plugin } from 'vue'

import Alert from '@/components/global/base/Alert.vue'
import CodeBlock from '@/components/global/base/CodeBlock.vue'
import CodeGroup from '@/components/global/base/CodeGroup.vue'
import MarkdownResolver from '@/components/MarkdownResolver.vue'
import Post from '@/components/Post.vue'
const plugin: Plugin = {
  install: (app) => {
    app.component('Post', Post)
    app.component('MarkdownResolver', MarkdownResolver)
    app.component('CodeBlock', CodeBlock)
    app.component('CodeGroup', CodeGroup)
    app.component('Alert', Alert)
  }
}

export default plugin
