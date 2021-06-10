---
title: Introduce Tailwind CSS to Vite and Vue3
description: Show how to introduce the CSS framework Tailwind CSS in your Vite project. In addition, explain how to set up Stylelint rules and VSCode for Tailwind CSS.
tags:
  - Vue3
  - tailwindcss
  - Vite
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1614954463/vite-vue3-tailwindcss/thumbnail.png
icatch: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1612608124/vite-vue3-tailwindcss/icatch.png
---

## Introduction

Vite has a No bundle policy and provides a fast HMR during development.
However, the default template with CLI itself is fairly simple, so when you start a Vite project,
you'll have to build your own environment to use the other modules.

In this article, I will use Vite to build an environment for Tailwind CSS as CSS framework.

Please refer to [here](https://github.com/TomokiMiyauci/vite-vue3-template) for more details.

In the following, I will assume that there is a Vite project.

## Environment building

First, install Tailwind CSS module and generate a configuration file.
As you want to use `scss` and `sass`, install modules for them as well.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D tailwindcss sass
yarn tailwindcss init
```

  </code-block>

  <code-block label="NPM">

```bash
npm i -d tailwindcss sass
npx tailwind init
```

  </code-block>
</code-group>

Next, prepare a style file to inject the tailwind directive.

```css:src/assets/styles/tailwind.scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Also need a PostCSS configuration file in the project root.

```js:postcss.config.js
module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
}
```

Finally, import the style file at the entry point.

<alert>For example, the path is specified in the path alias. Set the appropriate path.</alert>

```ts:src/main.ts
import { createApp } from 'vue'
import App from '/@/App.vue'
import '/@/assets/styles/main.scss'
import '/@/assets/styles/tailwind.scss'

createApp(App).mount('#app')
```

Now you can use Utility Classes during development.

## Improving DX

VSCode allows you to make tailwind's intellisense work.
[here](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) to install it.

Also, VSCode has `unknownAtRules` by default as it validates `css`.
To fix it, set the `settings.json` as follows.

```json:.vscode/settings.json
{
  "scss.validate": false,
  "css.validate": false
}
```

If you are using Stylelint, the syntax of `@tailwind` and `@apply`,
which are specific to tailwind may cause problems with Stylelint rules.

Let's get rid of this.

```json[.stylelintrc]
{
  "rules": {
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
  }
}
```

## PurgeCSS to optimize your build

If you build tailwind as is, it will also bundle a huge number of Utility Classes that you don't use with it.

Tailwind CSS supports PurgeCSS as standard, so you should configure it to optimize your build.

```js:tailwind.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path')
const BASE_DIR = join(__dirname, 'src')
const VUE_FILE = join('**', '*.vue')

const config = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [join(BASE_DIR, VUE_FILE), join(__dirname, '*.html')],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins:[],
}

module.exports = config
```

The reason why CommonJS format is used instead of ES Module format,
is because the Tailwind CSS plugin cannot recognize the ES Module format.
The reason why it is `.js` format is also the same.

Now the environment of Tailwind CSS has been created.
