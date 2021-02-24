---
title: 最小構成でTypescriptパッケージを公開する
description: TypescriptプロジェクトをパッケージとしてNPMレジストリへ公開する方法を説明します。パッケージマネジャーにNPM、Yarnを使っている場合を想定しています。
tags:
  - Typescript
  - Package
  - Yarn
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1614173989/typescript-library-release/thumbnail.png
icatch: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1605456609/typescript-library-release/thumbnail.png
---

## はじめに

Typescript で書かれた Node.js パッケージを NPM レジストリへ公開する方法を紹介します。
トランスパイラに`tsc`を、ターゲットに`CommonJS`を想定した、一般的なパッケージを公開する手順を説明します。

この記事では、特に以下の人におすすめの内容になっています。

- パッケージの公開を初めて行う方
- Typescript プロジェクトのパッケージについて知りたい方
- いきなり`standard-version`や`semantic-release`など自動リリースツールを使ったはいいものの、実際にどんなことを行っているのか知りたい方

この記事では、最も原初的なリリースの部分を説明しています。
そこで、Git タグやリリースノート、 GitHub リリースの更新などについては説明していません。
このあたりについては別の記事で紹介する予定です。

最後にはパッケージの削除のやり方まで紹介するので、手を動かしてやってもらえると、雰囲気をつかめるかと思われます。

## Typescript の環境構築

まずは、適当な Typescript プロジェクトを用意します。
.gitignore をはじめ各種リンターの導入などは説明から省くので、適宜対応してください。
すでにプロジェクトがある場合は、必要な部分を参考にしてください。

```bash
yarn init
```

```bash
package name: (test-typescript-release) //NPMに存在していない名前にする必要があります
version: (1.0.0) 0.0.0 //とりあえず0.0.0にしておきます
description: This is test typescript project
entry point: (index.js) dist/index.js　// outDirに合わせて変更します
test command:
git repository:
keywords: test
author: TomokiMiyauci
license: (ISC) MIT
```

package name については、NPM で一意である必要があります。次のコマンドや、NPM のウェブサイトなどで、プロジェクトが存在しているか確認しておくと確実です。

```bash
yarn info <package-name>
```

また最初の`version`については、`0.1.0`が推奨されているようですので、それよりも低い`0.0.0`にしておきます。

version`1.0.0`については、以下の基準があるようです。

> もし既にプロダクション用途であなたのソフトウェアが利用されているのなら、それは 1.0.0 であるべきでしょう。
> またもし安定した API を持ち、それに依存しているユーザーが複数いるのなら、それは 1.0.0 であるべきでしょう。
> もし後方互換性について多大な心配をしているのなら、それは 1.0.0 であるべきでしょう。`

続いて Typescript に必要なパッケージを導入します。

```bash
yarn add -D typescript @types/node
yarn tsc --init
```

```ts:tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",

    /* Checks */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },

  "include": ["src/**/*"]
}
```

Node.js で動くパッケージを想定しているので、`module`は`CommonJS`にします。
`outDir`にはコンパイルするときの出力先を指定します。
またパッケージなので、`declaration`や`declarationMap`、`sourceMap`は全て`true`にします。
そして、`include`にはコンパイルに含めるディレクトリを指定します。今回メインのコードは`src`以下に置くこととします。

package.json の`script`にビルド用のコマンドと、パブリッシュ前に毎回ビルドを行うコマンドを設定しましょう。

```json:package.json
{
  "name": "test-typescript-release",
  "version": "0.0.0",
  "description": "This is test typescript project",
  "main": "dist/index.js",
  "license": "MIT",
  "private": false,
  "files": [
    "dist"
  ],
  "devDependencies": {
    "typescript": "^4.0.5"
  },
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "yarn build" // npmユーザーの場合はnpm run build
  }
}
```

`private`オプションは`false`を明示しておきましょう。`true`の場合は決して公開されないことを示します。

また、`files`オプションには、実際に公開するディレクトリを指定します。これによって、余計なものを公開せずに済みます。
tsconfig.json の`outDir`で dist を指定したので、これに合わせて dist を指定します。
同様の理由で、`main`オプションも dist/index.js にします。これは`import`や`require`のエントリーポイントとなります。

あとは src ディレクトリを作って、適当なプログラムを用意します。エントリーポイントとしては先程`main`で dist/index.js を指定したので`index.ts`があれば問題ありません。

適当にファイルから関数をインポートして Re-export しておきます。ここはご自身で好きなプログラムを用意しても構いません。

```ts:src/index.ts
export { hello } from './core'
```

```ts:src/core.ts
export const hello = () => console.info('hello world')
```

これをコンパイルすると次のようなディレクトリ構造になります。

```bash
.
├── dist
│   ├── core.d.ts
│   ├── core.d.ts.map
│   ├── core.js
│   ├── core.js.map
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   └── index.js.map
├── package.json
├── src
│   ├── core.ts
│   └── index.ts
├── tsconfig.json
└── yarn.lock/package-lock.json
```

## パッケージを公開する

あとはパッケージを公開するだけです。公開するには、まず NPM のアカウントが必要です。
アカウントがない場合は、[こちら](https://www.npmjs.com/signup)からアカウントを作成してください。

続いて、コマンドラインでログインします。

```bash
yarn login
```

ちゃんとログインできたかは、次のコマンドで確認できます。

```bash
yarn npm whoami
```

無事ログインできたら、いよいよパッケージを公開します。
公開には次のコマンドを実行します。

```bash
yarn publish
```

対話型インタフェースで version を聞かれますので、最初は`0.1.0`としましょう。

```bash
info Current version: 0.0.0
question New version: 0.1.0
```

ここはインクリメントしなければ公開できない仕様になっています。
そのうち採番がめんどくさくなってきますが、commit message から自動採番するツールが存在します。このあたりの解説はまた別の記事で行います。

その後、package.json の version が自動で書き換わり、パッケージの公開が完了します。

またコマンドログを見ると、package.json の`prepublishOnly`に指定した、ビルドコマンドも実行されています。

無事公開されたら、公開されたパッケージをインストールしてみましょう。

```bash
yarn add <package-name>
```

普通のパッケージのように`import`や`require`で指定すると、しっかりインポートできます。エディタにもよりますが、型情報なども表示されているかと思われます。

また、インストールしたパッケージを node_modules から確認すると、以下のような内容が公開されていることがわかります。

```bash
.
├── dist
│   ├── core.d.ts
│   ├── core.d.ts.map
│   ├── core.js
│   ├── core.js.map
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   └── index.js.map
└── package.json
```

package.json の`files`オプションで指定したように、dist ディレクトリと、package.json のみが公開されているようですね。

## パッケージを削除する

パッケージの削除には次のコマンドを実行します。

```bash
npm unpublish <package-name>　--force
```

ちなみに yarn v1 では unpublish コマンドがサポートされていません。
そのため yarn で publish した場合でも、npm で unpublish すれば問題ないです。

また、unpublish には非公開ポリシーが存在します。
詳しくは[こちら](https://www.npmjs.com/policies/unpublish)を参照いただきたいですが、要約すると以下の場合、非公開にできます。

- 72 時間以内に公開されたパッケージ

  - NPM の他のパブリックパッケージに参照されていない

- 公開から 72 時間以上経過したパッケージ
  - NPM の他のパブリックパッケージに参照されていない
  - 前週のダウンロード数が 300 以下
  - 単一のオーナーまたはメンテナ

テストで作る分には問題ありませんが、他のパブリックパッケージに参照されると、削除は事実上できないことに注意が必要です。

なにはともあれこれで、 Typescript パッケージの公開ができました。
