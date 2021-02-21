---
title: Determine the function return type in Typescript's Conditional Types
description: Show how to more accurately infer the return type of an arrow function in Typescript. Explains Generics, Conditional Types and Union Distribution.
tags:
  - Typescript
  - Generics

thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1613880465/typescript-conditional-types/thumbnail.png
icatch: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1605795491/typescript-conditional-types/icatch.png
---

## Introduction

Show how to make the type of return value of an arrow function,
to be deduced more strictly with Generics and Conditional Types.

This is the case for the following.

```ts
// "0" | 0
const getZero = (isString: boolean) => {
  return isString ? '0' : 0
}
```

Aside from its usage, this function takes a `boolean` argument and returns either `'0'` or `0`.
The function expects the caller to infer `'0'` if given `true` and `0` if given `false`.
But in both cases, it is inferred to be `'0'` or `0`.
This behavior is not due to the omission of type annotations in the return value.

In this situation, you can use Conditional Types to supplement the type information to derive more accurate type information.
Let's take a look at it.

## Type definitions and Conditional Types

The previous example can be rewritten with Conditional Types as follows

```ts
const getZero = <T extends boolean>(isString: T): T extends true ? '0' : 0 => {
  return isString ? <T extends true ? '0' : 0>'0' : <T extends true ? '0' : 0>0
}
// or
const getZero = <T extends boolean>(isString: T): T extends true ? '0' : 0 => {
  return isString ? <any>'0' : 0
}
```

The first `<T extends boolean>` defines the generic `T`.
`T` is considered a `boolean`, `any` or `never` type that satisfies `extends boolean`.
The return type annotation says that if `T` meets `extends true` it is `'0'`, otherwise it is `0`.

It would be easier if this was all we could do, but unfortunately it's not.
The return value requires type overrides, depending on the assertion.

The first example is to cast it to the same type as the return value's type annotation.
This way, the code will compile, but it will be longer and less readable.

The second is to cast one of the return values as `any`. You don't want to see `any` if at all possible.

There is another way to do it, though.

If you are using a function declaration rather than an arrow function, you can get around this by overloading it.

```ts
/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */

function getZero(isString: true): '0'
function getZero(isString: false): 0
function getZero(isString: boolean): '0' | 0 {
  return isString ? '0' : 0
}
```

However, this is also a pain, and if you're using ESLint, you have to disable a lot of things.
The most important thing is that it has to be a function declaration instead of an arrow function, which is also a big pain.

Unfortunately, there doesn't seem to be any other way, so let's try to make the best of certain options.
The following is the current best way to write it.

```ts
const getZero = <T extends boolean>(isString: T): T extends true ? '0' : 0 => {
  return isString ? <T extends true ? '0' : 0>'0' : <T extends true ? '0' : 0>0
}
```

Since it is redundant, seek ways to write this short.
Write it as follows.

```ts
type ZeroOption<T extends boolean = false> = T extends true ? '0' : 0
const getZero = <T extends boolean>(isString: T): ZeroOption<T> => {
  return isString ? <ZeroOption<T>>'0' : <ZeroOption<T>>0
}
```

You can define a type alias like a variable in the `type`. You can also use generics for this.
Generics also allow you to specify a default type if a type argument is omitted.
This would make the recurring type annotations much shorter and more readable.

## Conditional Types and Union Distribution

Finally, let's see how the type is determined by arguments.
As mentioned earlier, can also take `any` and `never` compatible with `boolean` as arguments,
so let's see how the type is determined.

```ts
getZero(true) // "0"
getZero(false) // 0
getZero(true as boolean) // 0 | "0"
getZero(true as any) // 0 | "0"
getZero(true as never) // never
```

If the argument is `true` or `false`, it is as expected, but if it is `boolean`, `any` or `never`, why is this type judged?
The answer has to do with Union Distribution.
Union Distribution evaluates the Conditional Types separately for each when the generics are of a union type.

Since `boolean` is a union type of `true` and `false`, it is evaluated as follows.

`(true extends false ? "0" : 0) | (false extends false ? "0" : 0 )`  
This evaluated `0" : 0 | "0"`, resulting in `0 | "0"`.

In the case of `any`, the Conditional Types are union types, so the result is the same as `boolean`.

In the case of `never`, however, this is due to the fact that the `never` type is a union type with zero members.
The result of Conditional Types is also determined unconditionally to be of the zero union type, i.e., `never` type.
