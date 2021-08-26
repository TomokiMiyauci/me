declare var self: ServiceWorkerGlobalScope & typeof globalThis

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})
