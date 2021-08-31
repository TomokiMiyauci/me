import { useMemo, useEffect } from 'react'
import { wrap } from 'comlink'

const useLinkedWorker = <T>(worker?: Worker) => {
  const _worker = useMemo(() => {
    if (!worker) return

    return wrap<T>(worker)
  }, [worker])

  useEffect(() => () => worker?.terminate(), [])

  return _worker
}

export { useLinkedWorker }
