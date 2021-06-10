---
title: Create a document with VitePress
description: Introduce the basic usage of VitePress,multilingual support, homepage layout, meta tag injection, custom CSS, custom component and so on.
icatch: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1612608124/start-vitepress/icatch.png
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613247150/start-vitepress/cover.png
---

## Introduction

Hello. What tools do you use to create your documents? This time, I introduces a static site generator called VitePress.
VitePress is Vue based and he can do SSG, which is useful for document generation etc.
[Official](https://vitepress.vuejs.org) introduces as follows.

> VitePress is VuePress' little brother, built on top of Vite.

VuePress uses Vue and WebPack, but VitePress uses Vue and Vite.
You can also embed Vue components in Markdown as custom components,
but you don't need to know anything about Vue to create a document.

This time, I would like to introduce such basic usage of VitePress,
multilingual support that is not yet described in the document,
homepage layout, meta tag injection, custom components, how to apply custom CSS, and so on.

The following version was used for verification.

```bash
vitepress v0.12.0
```

## Development environment

First, create a development environment. Node.js and package manager are assumed to be installed.
Also, it is assumed that Yarn is the package manager, so please read as appropriate.

Now, install VitePress in a directory of your choice.

```bash
yarn add -D vitepress
```

Determine the root directory of the document.
This time it is `docs`. In addition, add `index.md` to the document root.

```bash
mkdir docs
echo '# Hello VitePress'> docs/index.md
```

It is convenient to add the following script to `package.json`.
Since you made `docs` the document root, you'll match the script with it.

```json:package.json
{
  "scripts": {
    "docs: dev": "vitepress dev docs",
    "docs: build": "vitepress build docs",
    "docs: serve": "vitepress serve docs"
  }
}
```

Running the `docs:dev` command will start the development server.
You are now ready.

## File structure

First, let's understand the file structure of VitePress.
VitePress requires the following file structure from the document root.

```bash
docs
├── index.md
├── en.md
├── ja
│ └── index.md
├── public
└── .vitepress
    └── config.js
```

Below `.vitepress`, you can customize VitePress meta information, themes, layouts, and more.
Of course, it works fine without any customization, so set it as needed.

### Markdown file and URL path

Looking at the file structure one by one, the file path of the `* .md` file under the root will be the URL path as it is.
There are three files here, `index.md`,`en.md`, and `ja/index.md`,
which will generate a page that can be accessed at the following URL.

| File          | URL      |
| ------------- | -------- |
| `index.md`    | /        |
| `en.md`       | /en.html |
| `ja/index.md` | /ja/     |

For `index.md`, you can load the correct page with a path ending with a slash, otherwise with the addition of `.html`.

## Layout

VitePress has two built-in layouts. These can be controlled from the `.md` front matter.

### Home layout

The home layout is as follows.

![home](https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613210376/start-vitepress/plain-home.png)
This can be set with `.md`.

```md:index.md
---
home: true
---
```

In addition, the following items can be set.

```md:index.md
---
home: true

heroImage: /logo.png
heroAlt: Logo image
heroText: Hero Title
tagline: Hero subtitle
actionText: Get Started
actionLink: /guide/
features:
- title: Simplicity First
  details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Vue-Powered
  details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
- title: Performant
  details: VitePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2019-present Evan You
---
```

`heroImage` and `heroAlt` specify the `src` and `alt` attributes for the `img` tag.
By the way, if you specify a path starting with a slash like `heroImage`, it will refer to the file in the public directory.

You can add link buttons with `actionText` and `actionLink`.
And can also add an array of `title` and `details` to `features` to get a nice output of your project's features.

You can add a footer tag to `footer`.

By setting these, can create the following layout.

![home](https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613211534/start-vitepress/home-description.png)

### Document layout

Next is the document layout. Basically, just write the markdown and the layout will be as follows.
![Document](https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613213743/start-vitepress/plain-document.png)

Now let's take a look at the `title` tag. By default, the `title` tag looks like this:

```html
<head>
  <title>VitePress</title>
</head>
```

If you add the `h2` tag as markdown, h2 content will be automatically added to the title.

```html
<head>
  <title>Introduction | VitePress</title>
</head>
```

In addition, this automatic insertion can be controlled by setting it in the front matter.

```md:index.md
---
title: Hello
---
```

```html
<head>
  <title>Hello | VitePress</title>
</head>
```

By the way, the title of the home layout is fixed to Home, so it seems that it cannot be changed.

You can change the project name of the title from the global settings described later.

### head tag setting

You can set the `head` tag as a setting common to both layouts.
As we will see later, there is also a way to set the `head` tag globally,
The one set on the page has priority.

```md
---
description: Hello document
head:
  - - meta
    - property: og:title
      content: Hello

    - link
    - rel: preconnect
      href: https://test.com
---
```

In this way, you can set the `head` to the `meta` element or the `link` element.
This allows you to write OGP related tags without any problems.

So far, we've seen how to customize Markdown with Front Matter.
Now let's look at global custom settings using the `config.js` file.

## Global settings

First, let's take a look at the type definition of the configuration file.

```ts
interface UserConfig<ThemeConfig = any> {
  lang?: string
  base?: string
  title?: string
  description?: string
  head?: HeadConfig[]
  themeConfig?: ThemeConfig
  locales?: Record<string, LocaleConfig>
  alias?: Record<string, string>
  markdown?: MarkdownOptions
  customData?: any
}
```

This time, I will explain each item excluding `alias`,`markdown`, and `customData`.

Also, this config file is only recognized by `.js`. Unfortunately, it is not possible to do type completion with Typescript,
You can use JSDoc for type completion as follows.

```js:config.js
/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: '',
  ...
}
```

### lang

The `lang` property allows you to change the `lang` attribute of the `html` tag.
Since it is added to the built-in attributes for VitePress such as `$siteByRoute` and `$site`,
It can also be used to create and embed `.vue` components.

### title

The `title` property allows you to set the project name for the `title` in the `head` tag.

```html
<head>
  <title>Hello | My Project</title>
</head>
```

### base

The `base` property should be set when deploying the site under a subpath, such as a GitHub page.
For example, if you want to deploy to the URL `https://foo.github.io/bar/`, set`/bar/`.

```js:config.js
module.exports = {
  base: '/bar/',
}
```

### description

The `description` property allows you to set the `description` of the `head` tag.

```html
<head>
  <meta name="description" content="This is my project" />
</head>
```

However, if it is in `description` in the front matter of Markdown, that will take precedence.

### head

The `head` property allows you to insert a `head` tag.
This is useful when you want to set it for the entire project instead of setting it for each page.
It is a double array and it is a little difficult to understand, so I will give an example.

```js:config.js
module.exports = {
  head: [
    ['meta', { property: 'og:description', content: 'description' }],
  ]
}
```

If it is also set on the page, the page has priority.

### themeConfig

The `themeConfig` property allows you to control edit links on GitHub and configure navigation settings.
There are a few elements, so let's take a look.

#### GitHub edit link

You can automatically generate GitHub edit links by setting up a GitHub repository or branch.
A link is also added to the navigation at the top of the page.

```js:config.js
module.exports = {
  themeConfig: {
      editLinks: true,
      editLinkText: 'GitHubでこのページを編集',
      repo: 'TomokiMiyauci/file-select-dialog',
      docsDir: 'docs',
      docsBranch: 'main',
  }
}
```

![edit on GitHub](https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613221055/start-vitepress/edit-on-github.png)

`docsDir` specifies the document root on GiHub.
Basically, it is the same as the document root set at the beginning and there is no problem.

#### lastUpdated

You can automatically generate the last updated date of an article with the `lastUpdated` property.

```js:config.js
module.exports = {
  themeConfig: {
    lastUpdated: '最終更新'
  }
}
```

![last updated](https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613220537/start-vitepress/lastupdate.png)

#### logo

You can set the logo at the top with the `logo` property.

![logo](https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613221493/start-vitepress/logo.png)
This logo may be misaligned depending on the image size, but it will be fixed by the custom CSS described below.

#### nav

You can set the navigation at the top with the `nav` property.

```js:config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'ガイド', link: '/ja/' },
      {
        text: 'API ',
        link: '/ja/api',
        activeMatch: '^/ja/api'
      },
      {
        text: 'リリースノート',
        link:
          'https://github.com/TomokiMiyauci/file-select-dialog/blob/main/CHANGELOG.md'
      }
    ],
  }
}
```

![navigation](https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613221994/start-vitepress/navigation.png)

At this point, the document should be created nicely.
Of course, you can leave it as it is, but there are still more customizable elements in VitePress.

From here, I will explain about multilingual support, custom components, and custom CSS.

## Multilingual

VitePress generates paths on a file basis, as described in
[Markdown Files and URL Paths](#markdown-file-and-url-path).
Therefore, for multilingual settings, prepare a markdown file for a different language and just switch languages.

There is a built-in menu component for language switching. Let's take a look at that setting.

```js:config.js
module.exports = {
  themeConfig: {
    locales: {
      '/': {
          label: 'English',
          selectText: 'Languages',
      },
      '/ja/': {
          label: '日本語',
          selectText: '言語',
      },
    }
  }
}
```

![locale](https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613224070/start-vitepress/locale.png)
This allows you to switch languages. It's convenient:sparkles:.

You can also set the `themeConfig` property described above with the `locales` property.
For example, to change `editLinkText` depending on the language, do as follows.
The key specified in `locales` is mapped to the URL path.

```js:config.js
module.exports = {
  themeConfig: {
    locales: {
      '/': {
        editLinkText: 'edit on GitHub'
      },
      '/ja/': {
        editLinkText: 'GitHubでこのページを編集',
      },
    },

    editLinks: true
  }
}
```

In addition, if it is not in `locales`, it will fall back to the property of `themeConfig`.
`editLinks` is common across languages, so you can set it as in the example above.

Not only `themeConfig` but also `head` tags can be multilingualized. For example, to make the `description` property multilingual:

```js:config.js
module.exports = {
  locales: {
      '/': {
          description: 'locale En',
      },
      '/ja/': {
          description: 'locale Ja',
      }
  }
}
```

In summary, `config.js` looks like as below.

The point is that the `locales` property can be set in both the part that modifies the `head` tag and the `themeConfig` property.
Some OGP tags etc. are omitted, so please add them as appropriate.

```js:config.js
module.exports = {
  title: 'My Project',
  head: [
    ['meta', { property: 'og:title', content: 'My Project' }],
  ],
  locales: {
      '/': {
          description: 'locale En',
      },
      '/ja/': {
          description: 'locale Ja',
      }
  },
  themeConfig: {
    editLinks: true,
    editLinkText: 'GitHubでこのページを編集',
    repo: 'TomokiMiyauci/file-select-dialog',
    docsDir: 'docs',
    docsBranch: 'main',
    logo: '/logo2.png',
    locales: {
      '/': {
          label: 'English',
          selectText: 'Languages',
          editLinkText: 'edit on GitHub',
          lastUpdated: 'Last Updated',
          nav: [
            { text: 'guide', link: '/guide/' },
            {
              text: 'API',
              link: '/api/',
            },
            {
              text: 'Release note',
              link:
                'https://github.com/TomokiMiyauci/file-select-dialog/blob/main/CHANGELOG.md'
            }
        ],
      },
      '/ja/': {
          label: '日本語',
          selectText: '言語',
          editLinkText: 'GitHubでこのページを編集',
          lastUpdated: '最終更新',
          nav: [
            { text: 'ガイド', link: '/ja/guide/' },
            {
              text: 'API ',
              link: '/ja/api/',
            },
            {
              text: 'リリースノート',
              link:
                'https://github.com/TomokiMiyauci/file-select-dialog/blob/main/CHANGELOG.md'
            }
        ],
      },
    }
  }
}
```

## Custom components

You may also want to use Vue components for markdown.
With VitePress, of course, you can do that with very little configuration.
First, create a `components` directory under the `.vitepress` directory and create a `components` directory.
Make a suitable component there. The name `components` can be anything.

```bash
docs
 index.md
└── .vitepress
    ├──config.js
    └──components
        └──Playground.vue
```

```html:Playground.vue
<template>
    <button @click="onClick">Increase</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(0)
const onClick = ():void => {
    count.value++
}
</script>
```

Then register this component globally. This is the same flow as Vue3.
Create a `theme` directory under the `.vitepress` directory and create a `index.js` file.

```bash
docs
└── .vitepress
    ├──config.js
    ├──components
    │  └──Playground.vue
    └── theme
        └── index.js
```

```js:index.js
import Theme from 'vitepress/theme'
import Playground from '../components/Playground.vue'

export default {
  ...Theme,

  enhanceApp({ app }) {
    app.component('playground', Playground)
  }
}
```

A Vue instance is passed to a property called `enhanceApp` in `index.js`, so set it as a global component.
Also, `Theme` is required when using VitePress default layout etc.

Then place the component directly in the markdown file.

```md:index.md
## Introduction

<playground />
```

## Custom CSS

You can override the style to change the theme color and logo size.
First, let's take a look at CSS Variables.

```css
:root {
  --c-white: #ffffff;
  --c-black: #000000;
  --c-divider-light: rgba(60, 60, 67, 0.12);
  --c-divider-dark: rgba(84, 84, 88, 0.48);
  --c-text-light-1: #2c3e50;
  --c-text-light-2: #476582;
  --c-text-light-3: #90a4b7;
  --c-brand: #3eaf7c;
  --c-brand-light: #4abf8a;
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  --font-family-mono: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  --z-index-navbar: 10;
  --z-index-sidebar: 6;
  --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-2: 0 3px 12px rgba(0, 0, 0, 0.07), 0 1px 4px rgba(0, 0, 0, 0.07);
  --shadow-3: 0 12px 32px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.08);
  --shadow-4: -2 14px 44px rgba(0, 0, 0, 0.12), 0 3px 9px rgba(0, 0, 0, 0.12);
  --shadow-5: 0 18px 56px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.16);
  --header-height: 3.6rem;
}
```

These are easy to change, so let's change the brand color. Also, change the size of the logo.
To change it, define the property you want to overwrite in the CSS file and import it with `theme/index.js`.

```css:theme/custom.css
:root {
  --c-brand: #8664ff;
  --c-brand-light: #8974ff;
}

.nav-bar .logo {
  height: 30px;
  margin-right: 2px;
}
```

```js:theme/index.js
import './custom.css'

export default {}
```

In this way, I was able to change the color and size of the logo.
![theme color](https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613244560/start-vitepress/theme-color.png)

## Summary

I've seen document creation in VitePress.

Currently, VitePress is very particular about being minimal,
and it's being debated whether its role is to focus on document generation or to add features for things like blogging.
There is still room for development and there are bugs in the details, but I would like to expect future trends.
