const getServiceWorker = async (
  clientURL: Parameters<typeof navigator.serviceWorker.getRegistration>[number]
): Promise<ServiceWorkerRegistration | void> => {
  return window.navigator.serviceWorker
    .getRegistration(clientURL)
    .then((_sw) => {
      if (_sw) {
        return _sw
      }

      console.error(`Service worker[${clientURL}] is not exists$`)
    })
    .catch(() => {
      console.error(`Service worker[${clientURL}] is not exists$`)
    })
}

export { getServiceWorker }
