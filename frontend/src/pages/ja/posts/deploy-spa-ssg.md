---
title: SPAやSSGの仕組みをデプロイの観点から理解する
description: SPAやSSGの仕組みをデプロイという観点から説明します。例としてViteで作られたVue3プロジェクトを用いて、実際にFirebase Hostingへデプロイしてみます。404ページや動的ルーティングについてもふれ、正しくデプロイする方法を学びます。
icatch: deploy-spa-ssg/icatch.png
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_256/v1612608124/deploy-spa-ssg/thumbnail.png
---

## はじめに

SPA や SSG のビルド時のアウトプットには違いがあります。ファイル構造が異なるために、ウェブサーバーへ設定をしないと、リロード時に 404 が出たりすることもあります。
この記事では、SPA と SSG の違いについて、デプロイという観点から見ていきます。そして実際に デプロイするときに、どのような観点に注意が必要か説明します。

説明のための SPA、SSG 環境 としては、Vite を用いた Vue3 環境を用います。
基本的にはフレームワークごとに、アウトプットのファイル構造や、ルーティングに大きな違いはないと思うので、他のフレームワークでも参考になると思います。

余談ですが、Vite は ESbuild を用いた高速な開発環境を提供してくれます。
`Vue`だけでなく、`React`や`Preact`、最近では`lit-element`も公式にサポートされ、多くのフロントエンドフレームワークの開発基盤になるのもそう遠くないかもしれません。

この機会にぜひ使ってみてください。:rocket:

## 環境構築

どちらともなるべく最小構成で、ルーターの設定や動的パスの設定のみを行います。

### Vue3 SPA

```bash
yarn create @vitejs/app your-project --template vue-ts
cd your-project
yarn add vue-router@next
```

次のようなページを用意します。

- `/`
- `/hello`
- `/hello/world`
- `/hello/[:name]`

ルーティングテーブルは後述する  SSG と同じにします。

```ts:src/route.ts {1}
import type { RouteRecordRaw } from 'vue-router'

import Index from './pages/index.vue'

const routes: RouteRecordRaw[] = [{
    component: Index,
    path: '/'
},{
    component: () => import('./pages/hello.vue'),
    path: '/hello'
},{
    component: () => import('./pages/hello-world.vue'),
    path: '/hello/world'
},{
    component: () => import('./pages/:name.vue'),
    path: '/hello/:id'
}]

export default routes
```

```ts:src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes'

const history = createWebHistory()
const router = createRouter({
    routes,
    history
})

createApp(App).use(router).mount('#app')
```

```tsx:src/App.vue
<template>
  <router-view />
</template>
```

この状態でビルドすると次のようなファイル構造になります。

```bash
./dist
├── assets
│   ├── :name.77773ec1.js
│   ├── hello-world.f7588bab.js
│   ├── hello.66b25ed4.js
│   ├── index.0e9c5a90.js
│   └── vendor.c06ee164.js
├── favicon.ico
└── index.html
```

SPA なので`index.html`と assets の中にページごとにチャンクされた`js`ファイルが生成されています。ちなみにページ単位のチャンク分割は、ルーティングの設定の際、dynamic import でコンポーネントを設定すると適応されます。

```ts:src/routes.ts
const routes: RouteRecordRaw[] = [{
    component: Index,
    path: '/'
},{
    component: () => import('./pages/hello.vue') //dynamic import,
    path: '/hello'
},...]
```

続いてデプロイを行います。デプロイ先は Firebase Hosting にします。
幸い、Firebase の CLI で設定ファイルを生成するときに、SPA かどうか聞いてくれるので、いわれるがままの設定にします。

```bash
firebase init
```

`publish`オプションをビルドのアウトプットディレクトリを同じにする必要があります。

```json:firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

用意したページは、この設定ですべてうまく動作します。動的ルートだろうがネストされたルートだろうが、hosting の`rewrites`のすべてのパターンを`/index.html`にリダイレクトしているからです。

ただしこれによって、用意したページ以外のアクセスであっても、404 などを返さなくなっています。

SPA の場合はアプリケーションでルーティングを判断するため、アプリケーション側で、404 などのページを用意する必要があります。
先程のルーティングテーブルに 404 ページを登録し、適当な 404 コンポーネントを作ります。

```ts
const routes: RouteRecordRaw[] = [{
    component: Index,
    path: '/'
},...,
{ path: '/:pathMatch(.*)*', component: () => import('./pages/404.vue') }]

```

Vue の場合は routes のパスマッチングは先頭から行われるため、404 のようなその他すべてに一致させるためには、ルーティングテーブルの一番最後に 404 用のコンポーネントを追加します。

ちなみに Vue Router の Catch All パターンマッチングは 4 系と３系では異なるため、注意が必要です。

- Vue Router 4(next): `path: '/:pathMatch(.*)*'`
- Vue Router 3: `path: '/*'`

これでデプロイをし直すと、定義していないルーティングテーブルへのアクセスで 404 ページを返すことができます。
ここまでをまとめると、

- SPA では html ファイルがひとつなため、ウェブサーバーは`index.html`をリダイレクトする必要がある。
- どのパスのアクセスでも`index.html`が返ってしまうので、アプリケーション側で 404 などの設定が必要。

### Vue3 SSG

続いて SSG の場合を見てみましょう。

```bash
yarn add -D vue-router@next vite-ssg @vue/server-renderer @vue/compiler-sfc
```

以下のようにビルドコマンドを変更します。

```json:package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite-ssg build",
  }
}
```

```ts:src/main.ts
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from './routes'

export const createApp = ViteSSG(
  App,
  { routes },
)
```

ルーティングテーブルは SPA と同じとします。

```ts:src/routes.ts
import type {RouteRecordRaw} from 'vue-router'

import Index from './pages/index.vue'

const routes: RouteRecordRaw[] = [{
    component: Index,
    path: '/'
},{
    component: () => import('./pages/hello.vue'),
    path: '/hello'
},{
    component: () => import('./pages/hello-world.vue'),
    path: '/hello/world'
},{
    component: () => import('./pages/:name.vue'),
    path: '/hello/:id'
},
{ path: '/:pathMatch(.*)*', component: () => import('./pages/404.vue') }]

export default routes
```

この状態でビルドすると、次のような出力を得られます。

```bash
./dist
├── assets
│   ├── 404.73ab3261.js
│   ├── :name.77773ec1.js
│   ├── app.93d6219f.js
│   ├── hello-world.d771174b.js
│   ├── hello.30d6902b.js
│   └── vendor.a92cda49.js
├── favicon.ico
├── hello
│   └── world.html
├── hello.html
└──  index.html
```

ちゃんとそれぞれの html ファイルが出力されていますね。動的ルーティングは、ビルド時にパラメータを渡してあげなければ、静的ファイルは生成されません。
Firebase Hosting の設定は、ひとまずデフォルトである次のようにしておきます。

```json:firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

この状態でデプロイすると、`/`へのアクセスはうまくいきます。しかし、その他のパスへのアクセスは 、次のようなレスポンスを返してきます。

| パス                     | レスポンス    |
| ------------------------ | ------------- |
| `/`                      | index.vue     |
| `/hello`, `/hello/world` | 404 Not Found |
| `/hello/world.html`      | :name.vue     |
| `/hello.html`            | 404.vue       |

この結果は少し興味深いので見ていきます。`/`への結果は当然として、`/hello`や`/hello/world`は HTTP レスポンスとして 404 が返ります。
ホスティングの設定としては、html ファイルへのリダイレクトをしていないので、ファイルが見つからなかったということですね。

`/hello/world.html`への結果は、動的パスを指定した:name.vue が返っています。`/hello/:id`として動的パスを設定したので、ここにマッチしたわけですね。

`/hello.html`への結果は、Catch All で定義した 404.vue が返っています。これは、html ファイルはヒットしたが、`/hello.html`というパスがルーティングテーブルになかったために、自己定義の 404 ページが表示されたということです。

実際上の例の`.html`を加えたパスは、レスポンスこそ正しいですが、正しく動作しません。`.html`を加えたパスをルーティングテーブルには定義していないため、JavaScript が正しく認識されないためです。

SSG を正しく動作させるためには、ホスティング側の設定としては次のような対応が必要です。

| パス | リダイレクト |
| ---- | ------------ |
| `/`  | index.html   |
| `/*` | \*.html      |

とてもシンプルですね:sparkles:。このパターンリダイレクトは多くの Web サーバには簡単に設定できるので Firebase Hosting の場合を見てみましょう。

```json:firebase.json
{
  "hosting": {
    // ...,
    "cleanUrls": true,
    "trailingSlash": false
  },
}
```

`cleanUrls` 属性は、URL に .html 拡張子を含めるかどうかを制御できます。
`trailingSlash` 属性は、静的コンテンツの URL に末尾のスラッシュを含めるかどうかを制御できます。これによって、`/hello/`のようなリクエストも正しく捌くことができます。

## まとめ

SPA、SSG の仕組みやホスティングについて簡単に見てきました。上の例は、振り返ると至極当たり前のことだったりするのですが、SPA や SSG を始めたばかりだと、そもそもどのように動いているのかわからなかったりします。最後に簡単に要点だけまとめます。

- SPA、SSG とともにまずは 実際の html ファイルを返すようにリダイレクトが必要。
- ルーターは URL パスで JavaScript を制御するため、定義したルーティングパスが目的の html ファイルにリダイレクトするように、Web サーバーの設定が必要。
