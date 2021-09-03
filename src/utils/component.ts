type BasicProps = {
  className?: string
}

type PromiseProps = {
  onSuccess: () => void
  onError: (e: Error) => void
}

type Override<
  T extends Record<PropertyKey, unknown>,
  U extends Record<PropertyKey, unknown>
> = keyof T extends keyof U ? Omit<U, keyof T> : U

const defineComponent = <T extends Record<PropertyKey, unknown>>(
  fn: (props: T & BasicProps) => JSX.Element
) => fn

const definePromise = <T extends Record<PropertyKey, unknown>>(
  fn: (
    onPromise: T & Override<T, BasicProps> & Override<T, PromiseProps>
  ) => JSX.Element
) => fn

export { defineComponent, definePromise }
