---
title: JestでTypescriptを高速化する
description: Jestでテストの高速化させる方法を紹介します。トランスフォーマーとしてesbuildやswcを紹介し、TypeScriptで遅くなりがちなトランスパイルを高速化させることで、テストを自体を高速化します。

icatch: speeding-up-jest/hero.png
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1616850161/speeding-up-jest/thumbnail.png
---

## はじめに

`esbuild` の登場により、フロントエンドの世界は、開発環境により速度を求めるようになりました。`vite` の隆盛はその最たるものといってもいいでしょう。

`esbuild` や `swc` は高速な `Go` や `Rust` によって書かれ、更に多くの場合、Typescript の型チェックを省略しています。
`tsc` の型チェックは、大抵 IDE やワークフローで行われているので、これらを削ぎ落とすことで、純粋なコンパイラとして `JavaScript` への変換に特化しているということですね。

さて、Typescript コードをテストする際、多くの場合[ts-jest](https://github.com/kulshekhar/ts-jest)や[babel-jest](https://www.npmjs.com/package/babel-jest)をトランスフォーマーとして使用していると思います。しかし、これらによってテストの速度が低下することがあります。

今回は `jest` の実行を高速化し、高速なテストを実現する方法を紹介します。

## 結論

先に導入方法について書いておきます。

```bash
yarn add -D jest @swc/jest
```

```json:jest.config.json
{
  "transform": {
    "^.+\\.(t|j)sx?$": "@swc/jest"
  }
}
```

トランスフォーマーに `swc` を jest 向けに調整した `@swc/jest` を使います。

## パフォーマンス比較

高速化によって、どの程度パフォーマンスが改善したか見てみます。

<alert type="warning">
実行環境によってパフォーマンスは異なるので、実測値ではなくそれぞれ結果の相対的な対比を行います。</alert>

### CommonJS + Javascript

理論上最速となりそうなパターンを試してみます。CommonJS 形式の JavaScript はトランスパイルの必要がないはずなので、最速になるはずです。（間違ってたらごめんなさい :pray:）

関数の中身に興味はないので、適当な関数を用意してテストします。

```js:index.js
exports.add = (a, b) => a + b
```

```js:test/index.spec.js
const { add } = require('../src')

describe('add', () => {
    it('should return 2 when it gives 1,1', () => {
        const result = add(1,1)
        expect(result).toBe(2)
    })
})
```

```js:jest.config.js
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/test/"]
};
```

これをキャッシュを無効にして 10 回程度の平均を取ります。
あまり厳密な測定ではないですが、今回はそれぞれの速度比較なので、条件を合わせることで相対的な比較はできていると考えます。

```bash
for i in {0..9}; do yarn jest --no-cache ; done
```

結果:

| Transformer                   | 平均値(s) |
| ----------------------------- | --------- |
| なし（CommonJS + JavaScript） | 0.512     |

これを基準に考えていきます。

### ESM + TypeScript

TypeScript を ES module 形式で記述するパターンです。TypeScript を使う場合の多くはこのパターンでしょう。

```ts:index.ts
export const add = (a: number, b: number): number => a + b
```

```ts:test/index.spec.ts
import { add } from '../src/'

describe('add', () => {
    it('should return 2 when it gives 1,1', () => {
        const result = add(1,1)
        expect(result).toBe(2)
    })
})
```

#### トランスフォーマーに ts-jest を使う

```js:jest.config.js
module.exports = {
  ...,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  }
};

```

結果:

| Transformer                   | 平均値(s) |
| ----------------------------- | --------- |
| `ts-jest`                     | 1.660     |
| なし（CommonJS + JavaScript） | 0.512     |

CommonJS + JavaScript と比較すると３倍程度時間がかかっています。これはなんとかしたいですね。

#### トランスフォーマーに esbuild を使う

[esbuild](https://github.com/swc-project/swc)は Go で記述された高速なバンドラーです。バンドラーと言ってもデフォルトで、TypeScript 構文の解析と型注釈の破棄に対するサポートが組み込まれています。

```bash
yarn add -D esbuild-jest esbuild
```

```js:jest.config.js
module.exports = {
  ...,
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest'
  }
};
```

結果:

| Transformer                   | 平均値(s) |
| ----------------------------- | --------- |
| `esbuild-jest`                | 0.373     |
| `ts-jest`                     | 1.660     |
| なし（CommonJS + JavaScript） | 0.512     |

驚異的な速度ですね。特に CommonJS + JavaScript よりも早いのは驚きですね。

#### トランスフォーマーに swc を使う

[swc](https://github.com/swc-project/swc) は、rust で記述された超高速コンパイラです。
[Deno](https://github.com/denoland/deno)も`deno lint`や`deno doc`に使っているみたいですね。

```bash
yarn add -D @swc/jest
```

```js:jest.config.js
module.exports = {
  ...,
  transform: {
    '^.+\\.tsx?$': ['@swc/jest'],
  }
};
```

結果:

| Transformer                 | 平均値(s) |
| --------------------------- | --------- |
| `@swc/jest`                 | 0.351     |
| `esbuild-jest`              | 0.373     |
| `ts-jest`                   | 1.660     |
| なし（CommonJS + JavaScript | 0.512     |

`esbuild` も `swc` も驚異的な速度でトランスパイルできることがわかります。双方の速度面の比較はこの結果だけではできませんが、調べた感じだと`swc`のほうが若干有利のようでした。ただし、`esbuild-jest` ではオプションとして次の項目を変更できる利点があります。

```ts
interface Options {
  jsxFactory?: string
  jsxFragment?: string
  sourcemap?: boolean | 'inline' | 'external'
  loaders?: {
    [ext: string]: Loader
  }
  target?: string
  format?: string
}
```

また、VSCode の場合は、[jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) の拡張機能が提供されています。
これは、テスト対象に変更があった場合などに、バックグラウンドで自動的にテストを実行してくれますが、当然このテストも高速になります。

テストが成功した場合、:white_check_mark:を対象コードにつけてくれます。テストがすぐに終わるため、すぐにマークをつけてくれるのが開発体験としてはかなりいいです。

## jest.config.ts をやめる

上の結果は、`jest`の設定ファイルとして`jest.config.js`を使っていました。
しかし、`.ts`形式の設定ファイルにすると、トランスフォーマーを変えたとしても、パフォーマンスがあまり改善しません。

```bash
// @swc/jest + jest.config.js
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.385 s
Ran all test suites.
✨  Done in 1.24s.

// @swc/jest + jest.config.ts
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.389 s
Ran all test suites.
✨  Done in 2.93s.
```

ファイル形式を `.ts` に変えただけで２倍以上時間がかかるようになってしまいました。

これは jest は `jest.config.ts` のトランスパイルに `ts-node` を要求しているからです。
そこで可能であれば json 形式で `jest.config.json` や諦めて `jest.config.js` 形式で設定ファイルを書く必要があります。

## Cons

冒頭述べている通り、`esbuild` や `swc` は型チェックを省略し、速度を享受しています。よって、次のコードはテスト時にコンパイルエラーを検出できません。

```ts
export const add = (a: number, b: string): number => a + b
```

この場合は、アノテーションが不適切ですが、JavaScript にコンパイルされたときには、正常のコードとして動くのでテストも通ります。

かといっても、大抵の IDE ではエラーを視覚的に表示しているはずですし、ワークフローに `tsc` を追加しておけば、未然に防ぐことができます。

以上のことから、速度重視で代替手段や工夫が講じられる環境であれば、積極的に採用できるのではと思います。
