---
title: Building a Vue3 Typescript Environment with Vite
description: Building a Typescript Vue3 environment using the No bundle tool Vite, along with ESLint and Prettier configuration to create a high DX environment.
tags:
  - Vue3
  - Tutorial
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1615388322/vite-vue3-typescript/thumbnail.png
icatch: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1612608124/vite-vue3-typescript/icatch.png
---

## Introduction

Vite is a build tool developed by Evan You, the author of Vue.
It uses native ES Module imports to provide a fast running development environment with no bundling required.
Vue3, React and Preact are also supported.

In this article, I'll build a Vue3 project environment using Vite.

You can find the template in [here](https://github.com/TomokiMiyauci/vite-vue3-template).

## Things to do

The goal is to get you close to the default vue/cli template, and I'll implement the necessary tools for development.
I'm going to walk you through each of these tools so that you can introduce them individually.

- Typescript
- ESLint
- Prettier
- Stylelint
- husky and lint-staged
- Path Alias
- VTI

## Building Environments

First, let's expand the vite template.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create vite-app <project-name>
cd <project-name>
yarn
```

  </code-block>

  <code-block label="NPM">

```bash
npm init vite-app <project-name>
cd <project-name>
npm i
```

  </code-block>
</code-group>

Once the development server is up, you'll be impressed by how fast it is.

### Typescript

Next, let's make your project Typescripted.
Since Vue3 has Typescript by default, you only need to do the following three things.

1.Add `lang="ts"` to the `script` tag in all `.vue` files.  
2.Change `main.js` to `main.ts`.  
3.Change the src of the script tag of `index.html` to `/src/main.ts`.

Now you can start up the development server and see that it runs without any problem.

It will actually work on its own, but you can add more settings to improve the user experience in the editor.

If you're using VSCode, you should see a `main.ts` with a `ts(2307)` error.

To fix this, need to create a type declaration file for vue.

```ts:src/shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string,unknown>, Record<string,unknown>, unknown>
  export default component
}
```

Place the `tsconfig.json` in your project root. This will tell the editor to recognize the project as a Typescript project.

```json:tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "/@/*": [ // / to begin with.
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
  ],
  "exclude": [
    "node_modules"
  ]
}
```

That's the end of Typescript.

### Introducing ESLint

Development without a linter is tough, so be sure to install it.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D eslint eslint-plugin-vue @vue/eslint-config-typescript
@typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
```

  </code-block>

  <code-block label="NPM">

```bash
npm i -D eslint eslint-plugin-vue @vue/eslint-config-typescript
@typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
```

  </code-block>

</code-group>

```json:.eslintrc
{
  "root": true,
  "env": {
      "browser": true,
      "es2021": true,
      "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  "parserOptions": {
      "ecmaVersion": 2021
  },
  "plugins": [
  ],
  "rules": {
  }
}
```

It is easy to prepare a linting command in the `script` of the `package.json` for later.

```json:package.json
"scripts": {
  "lint:script": "eslint --ext .ts,vue --ignore-path .gitignore ."
}
```

Personally, I don't want to fix some situations, so I use `--fix` from outside.

Now let's run this.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn lint:script --fix
```

  </code-block>

  <code-block label="NPM">

```bash
npm run lint:script --fix
```

  </code-block>
</code-group>

VSCode users can also set up the following settings to make the automatic formatting work.
An extension to ESLint is required, so if you don't have it, please install it [see here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

```json:.vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

This allowed me to format the file on save.

### Configuring husky and lint-staged

Before committing, let's run a static check to make sure you can't commit the error code.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D husky lint-staged
```

  </code-block>

  <code-block label="NPM">

```bash
npm i -D husky lint-staged
```

  </code-block>
</code-group>

Add the following to `package.json`.

```json:package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,vue}": "eslint --fix"
  }
}
```

This causes ESLint to run against any files with the appropriate extensions in the commit file before you commit.

Of course, on a linting error, the commit is canceled.

### Configuring Prettier

Let Prettier do the formatting for your entire project.
Also, let Prettier automatically remove semicolons in Typescript code.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D prettier eslint-plugin-prettier @vue/eslint-config-prettier
```

  </code-block>

  <code-block label="NPM">

```bash
npm i -D prettier eslint-plugin-prettier @vue/eslint-config-prettier
```

  </code-block>
</code-group>

```json:.prettierrc
{
  "singleQuote": true,
  "semi": false,
  "vueIndentScriptAndStyle": true
}
```

When ESLint and Prettier are used together, I need to fix the `.eslintrc` to avoid duplicate rules.

```json:.eslintrc
{
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    // 他のルールの下に追加
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ]
}
```

command to execute the formatter.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn prettier -w -u .
```

  </code-block>

  <code-block label="NPM">

```bash
npm run prettier -w -u .
```

  </code-block>
</code-group>

I want to apply automatic formatting before committing, so add the setting to `lint-staged`.

```json:package.json
{
 "lint-staged": {
    "*.{ts,vue}": "eslint --fix",
    "*": "prettier -w -u" // prettierは一番最後にします
  }
}
```

VSCode users can format it automatically with the following settings.
Also, an extension is required, so if it is not available, please install it [here](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

```json:.vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### Configuring Stylelint

Let's make the style a target for linting as well.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D stylelint stylelint-config-recommended stylelint-config-standard
```

  </code-block>

  <code-block label="NPM">

```bash
npm i -D stylelint stylelint-config-recommended stylelint-config-standard
```

  </code-block>
</code-group>

```json:.stylelintrc
{
  "extends": ["stylelint-config-recommended", "stylelint-config-standard"]
}
```

Edit the `package.json` and set the commands and lint-staged.

```json:package.json
{
  "scripts": {
    "lint:style": "stylelint src/**/*.{css,scss,vue}"
  },
  "lint-staged": {
    "*.{ts,tsx}": "eslint --fix",
    "*.{css,scss,vue}": "stylelint --fix",
    "*": "prettier -w -u"
  }
}
```

VSCode users can format it automatically with the following settings.
Extensions are required, so if you don't have them, install them [see here](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).

That's the end of the basic setup of the linker and formatter.

### Configuring Path Alias

The import of the module is relative by default, but you want to set an alias to always refer to the same root.
As vite seems to use Rollup internally, let's create a `vite.config.ts` file and set up alias.

<alert type="warning">Key must start with `/`.</alert>

```ts:vite.config.ts
import { join } from 'path'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  alias: {
    '/@/': join(__dirname, 'src'),
  }
}

export default config
```

Now you can set up alias. I'll use it like this.

```html:App.vue
<script lang="ts">
  import HelloWorld from '/@/components/HelloWorld.vue'
</script>
```

It's a little strange that it has to start from `/`, but it seems to combine with the alias of the package name.
For more information, please refer to [here](https://github.com/vitejs/vite/blob/master/src/node/config.ts#L53).

### Checking template statically in VTI

<alert type="warning" >VTI is a WIP, so use at your own discretion</alert>

I want to do a static check on the template tag in the Vue file as well.
In this case, use the vti in the Vetur project.

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D vti
```

  </code-block>

  <code-block label="NPM">

```bash
npm i -D vti
```

  </code-block>
</code-group>

```json:package.json
"scripts": {
  "lint:markup": "vti diagnostics",
}
```

The existing Vue files need to be wrapped with a `defineComponent` or they will fail.

```html:*.vue
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({})
</script>
```

I also recommend running static checks in CI rather than before committing,
as static checks can take quite a bit of time as the number of Vue files increases.

That's the minimum environment you'll need to build.
