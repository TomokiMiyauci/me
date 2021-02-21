---
title: TypescriptのConditional Typesで関数の戻り値の型を確約する
description: Typescriptでアロー関数の戻り値の型をより正確に推論する方法を紹介します。ジェネリクスやConditional Types、Union Distributionについて解説します。
tags:
  - Typescript
  - Generics

thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613880465/typescript-conditional-types/thumbnail.png
icatch: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1605795491/typescript-conditional-types/icatch.png
---

## はじめに

ジェネリクスと Conditional Types で、アロー関数の戻り値の型を、より厳密に推論されるようにする方法を紹介します。

具体的には次のようなケースです。

```ts
// "0" | 0
const getZero = (isString: boolean) => {
  return isString ? '0' : 0
}
```

この関数の使いみちはさておき、引数に`boolean`を受け取り、`'0'` もしくは `0`を返す関数です。
この関数は、呼び出し側としては、`true`を与えた場合は`'0'`を、`false`の場合は`0`という型推論を期待しますが、
実際にはどちらの場合でも`'0'` または `0`と推論されてしまいます。
この動作は、戻り値の型注釈を省略していることが原因ではありません。

こういった場面には Conditional Types で、型情報を補足してあげると、より正確な型情報の導出が可能です。
では見ていきましょう。

## 型定義と Conditional Types

先程の例は、Conditional Types で次のように書き換えられます。

```ts
const getZero = <T extends boolean>(isString: T): T extends true ? '0' : 0 => {
  return isString ? <T extends true ? '0' : 0>'0' : <T extends true ? '0' : 0>0
}
// または
const getZero = <T extends boolean>(isString: T): T extends true ? '0' : 0 => {
  return isString ? <any>'0' : 0
}
```

最初の`<T extends boolean>`でジェネリクス`T`を定義しています。`T`は`extends boolean`を満たす型すなわち、
`boolean`や`any`や`never`型とみなされます。戻り値の型注釈では`T`が`extends true`を満たせば`'0'`、それ以外では`0`としています。

これだけで良ければ楽なのですが、残念ながらそうは行きません。
戻り値の値にはアサーションによって、型の上書きが必要です。

１つ目の例は、戻り値の型注釈と同じ型にキャストする方法です。こうすればコンパイルは通りますが、長くなり可読性が損なわれます。

また２つ目は、戻り値のどちらかを`any`でキャストする方法です。なるべく`any`は見たくないものですね。

この他にも方法があることにはあります。
アロー関数ではなく、関数宣言ならオーバーロードをすることで、一応回避できます。

```ts
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */

function getZero(isString: true): '0'
function getZero(isString: false): 0
function getZero(isString: boolean): '0' | 0 {
  return isString ? '0' : 0
}
```

ただしこれには痛みも伴い、ESLint を使っている場合には、色々無効にしなければなりません。
なにより、アロー関数ではなく関数宣言でなければならないことも大きな痛手です。

残念ながら、これ以外の方法がないようなので、ある選択肢で最良を模索しましょう。
現状最も気分がいいのは以下の書き方です。

```ts
const getZero = <T extends boolean>(isString: T): T extends true ? '0' : 0 => {
  return isString ? <T extends true ? '0' : 0>'0' : <T extends true ? '0' : 0>0
}
```

冗長なので、これを短く書く方法を模索します。
以下のように書くことができます。

```ts
type ZeroOption<T extends boolean = false> = T extends true ? '0' : 0
const getZero = <T extends boolean>(isString: T): ZeroOption<T> => {
  return isString ? <ZeroOption<T>>'0' : <ZeroOption<T>>0
}
```

`type`で変数のように型エイリアスを定義できます。これにはジェネリクスも使うことができます。
またジェネリクスは型引数が省略された場合のデフォルトの型を指定できます。
これで繰り返し現れた型注釈がぐっと短くなり、可読性が向上したのではないでしょうか。

## Conditional Types と Union Distribution

最後に、引数によってどのように型が決定されるか見てみましょう。
先程触れたように、`boolean`と互換性のある`any`や`never`も引数に受け取れるので、その時の型がどのように判定されるのか確認しましょう。

```ts
getZero(true) // "0"
getZero(false) // 0
getZero(true as boolean) // 0 | "0"
getZero(true as any) // 0 | "0"
getZero(true as never) // never
```

引数に`true`や`false`を指定したときは期待通りですが、`boolean`や`any`、`never`のときはなぜこのような型が判定されるのでしょうか。
答えは Union Distribution が関係しています。
Union Distribution はジェネリクスがユニオン型の場合に、ユニオン型の各構成要素に対して別々に Conditional Types を評価するというものです。

`boolean`は`true`と`false`のユニオン型なので、次のように評価します。

`(true extends false ? "0" : 0) | (false extends false ? "0" : 0 )`  
これは`"0" : 0 | "0"`となり、結果として`0 | "0"`が推論されます。

`any`の場合、Conditional Types は両辺のユニオン型となります。 そのため、結果は`boolean`と同じようになります。

`never`の場合はですが、これは`never`型が 0 個のユニオン型なことが起因します。
Conditional Types の結果も無条件に 0 個のユニオン型、つまり`never`型と判定されます。
