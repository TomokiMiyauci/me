type BasicProps = {
  className?: string
}

type PromiseProps = {
  onSuccess: () => void
  onError: (e: Error) => void
}

const definePromise = <T extends Record<string, unknown>>(
  fn: (
    onPromise: Omit<PromiseProps, keyof T> & Omit<BasicProps, keyof T> & T
  ) => JSX.Element
) => fn

export { definePromise }
