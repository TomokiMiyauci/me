---
title: JestでTable Driven Testsをする
description: JestでTable Driven Testsをする方法を紹介します。Jestでは配列形式と、タグ付きテンプレートリテラル形式でテストを書けるので、2つの記述法を解説します。また、TypeScriptで書いた場合の型推論と、アサーションの方法についても紹介します。
icatch: jest-table-driven-tests/hero.png
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1616908348/jest-table-driven-tests/thubnail.png
---

## はじめに

Table Driven Tests は主に Go lang で推奨されるテスト手法です。
入力と期待される結果を含む完全なテストケースをテーブルとして定義し、テスト対象に対してテストケースをイテレーションしてテストを行います。
つまり、テストスイートを 1 回だけ記述し、テストデータを渡すことができます。
テストを作成するときにコピーアンドペーストが多い場合、テストケースをテーブルにリファクタリングできる可能性が高いです。

ちなみに Go lang の[公式](https://github.com/golang/go/wiki/TableDrivenTests)では次のように述べられています。

> Writing good tests is not trivial, but in many situations a lot of ground can be covered with table-driven tests

jest でも Table Driven Test がサポートされているので、その方法を共有したいと思います。

## テストケースの書き方

jest では 2 つの書き方でテストケースを表現できます。テスト対象として条件分岐があるような次のケースを考えます。

index.html 以外の \*.html を \*/index.html に変換する関数

```ts:index.ts
import { dirname, join, parse } from 'path'

export const path2IndexHtml = (path: string): string => {
    const EXT = '.html'
    const INDEX = 'index'
    const { ext, name, dir } = parse(path)
    if(ext !== EXT) return path
    if(name === INDEX) return path

    return join(dir, name, `${INDEX}${EXT}`)
}
```

この関数自体は、Server Side Generation の実装 でファイルを生成する際に、ディレクトリを掘ってほしいときに使いました。レアケースですかね笑

### テーブルの配列でテストする

1 つ目の書き方は、テーブルを配列として定義して渡す方法です。
次のように書きます。

```ts
describe.each(table)(name, fn, timeout)
it.each(table)(name, fn, timeout)
test.each(table)(name, fn, timeout)
```

Alias があるのでいくつかのオブジェクトが `each` メソッドを持っています。
具体的なテストケースは次のようになります。

```ts:index.spec.ts
import { path2IndexHtml } from '../src'

describe('path2IndexHtml', () => {
    const table = [
        ['', ''],
        ['index.html', 'index.html'],
        ['/index.html', '/index.html'],
        ['index.css', 'index.css'],
        ['about.css', 'about.css'],
        ['about/index.css', 'about/index.css'],
        ['about.html', 'about/index.html'],
        ['hoge/about.html', 'hoge/about/index.html'],
        ['/hoge/about.html', '/hoge/about/index.html'],
        ['aindex.html', 'aindex/index.html'],
        ['indexa.html', 'indexa/index.html'],
        ['/about/index.html', '/about/index.html'],
    ]
    it.each(table)('pattern1: path2IndexHtml(%s) = %s', (path, expected, fa) => {
        expect(path2IndexHtml(path)).toBe(expected)
    })
})
```

テストケースを２次元配列で記述します。配列内の要素の順番はそのままに `fn` の引数として渡されます。
また、 `name` にはテストスイートのタイトルを指定します。 `printf` の書式に従うパラメータを注入することで、ユニークなテストタイトルを生成できます。
詳細は[こちら](https://jestjs.io/ja/docs/api#1-describeeachtablename-fn-timeout)を確認してください。
これも配列の要素順にパラメータが渡されます。

ちなみに 1 次元の配列を渡した場合には、内部的には `[1, 2, 3]` -> `[[1],[2],[3]]` のように変換されます。

また、`fn` に渡されるパラメーターは TypeScript の場合、型推論されます。
上の例では `table` が `string[][]` 型なので、 `fn` の引数は `...args: string[]` と推論されます。
タプルとして推論させる場合は `as const` を `table` につけるとうまく推論されます。

他にも `each` メソッドはジェネリックス型を受け入れるので、次のように型を指定できます。

```ts:index.spec.ts
it.each<string[]>(table)
```

このテストを実行すると次の出力になりました。

```bash
 path2IndexHtml
    ✓ path2IndexHtml() ->
    ✓ path2IndexHtml(index.html) -> index.html
    ✓ path2IndexHtml(/index.html) -> /index.html
    ✓ path2IndexHtml(index.css) -> index.css
    ✓ path2IndexHtml(about.css) -> about.css
    ✓ path2IndexHtml(about/index.css) -> about/index.css (1 ms)
    ✓ path2IndexHtml(about.html) -> about/index.html
    ✓ path2IndexHtml(hoge/about.html) -> hoge/about/index.html
    ✓ path2IndexHtml(/hoge/about.html) -> /hoge/about/index.html
    ✓ path2IndexHtml(aindex.html) -> aindex/index.html
    ✓ path2IndexHtml(indexa.html) -> indexa/index.html
    ✓ path2IndexHtml(/about/index.html) -> /about/index.html
```

パラメーターがテストタイトルに埋め込まれてます。テストスイートを最小限に、様々なパラメーターのテストができました。

### タグ付きテンプレートリテラルでテストする

タグ付きテンプレートリテラルでテーブルを表現することもできます。

インターフェイスは次のようになります。

```ts
describe.each`
  table
`(name, fn, timeout)
it.each`
  table
`(name, fn, timeout)
test.each`
  table
`(name, fn, timeout)
```

実際に上の例と同じテストを書くと、次のようになります。

```ts:index.spec.ts
describe('path2IndexHtml', () => {
  it.each`
    path                 | expected
    ${''}                | ${''}
    ${'index.html'}      | ${'index.html'}
    ${'/index.html'}     | ${'/index.html'}
    ${'about.css'}       | ${'about.css'}
    ${'about/index.css'} | ${'about/index.css'}
    ${'about.html'}      | ${'about/index.html'}
    ${'hoge/about.html'} | ${'hoge/about/index.html'}
  `('path2IndexHtml($path) -> $expected', ({ path, expected }) => {
    expect(path2IndexHtml(path)).toBe(expected)
  })
})
```

`table` の 1 行目は変数名を指定します。後続の行は `${value}` 構文でテストケースを記述します。 `string` 型でも `${}` で囲わなければなりません。

`fn` の引数にはオブジェクトの形式で渡されるので、分割代入で受け取るといいと思います。

`name` のテストタイトルにパラメーターを使う場合は `$name` 形式で変数にアクセスできます。

この記法だと、テーブルの形でテストケースを記述できる点が利点です。
しかし、 `string` の多いテストケースの場合は `${}` と クオートであまり見やすくはありませんね。

また、この記法では `fn` の引数の型推論が `any` 型になってしまいます。
タグ付きテンプレートリテラルなので、ジェネリクスを受け入れられないため、これは仕方がありません。

どうしても型をつけたい場合は、`fn` 関数に型を定義します。

```ts:index.spec.ts
'path2IndexHtml($path) -> $expected',
  ({ path, expected }: { path: string; expected: string }) => {
    expect(path2IndexHtml(path)).toBe(expected)
  }
```

結果はどちらも同じになるので、テストケースや好みで記法を使い分けるといいと思います。
