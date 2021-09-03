self.addEventListener('notificationclick', (event) => {
  const _event = event as NotificationEvent
  const _clients = self.clients as Clients

  _event.notification.close()
  _event.waitUntil(
    _clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === _event.notification.data.url
            ? (windowClient.focus(), true)
            : false
        )

        if (!hadWindowToFocus)
          _clients
            .openWindow(_event.notification.data.url)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            )
      })
  )
})
