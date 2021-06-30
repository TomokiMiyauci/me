const optimizer = <E extends Event>(fn: (ev: Event) => unknown) => {
  let ticking = false

  return (ev: E) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        try {
          fn(ev)
        } finally {
          ticking = false
        }
      })
      ticking = true
    }
  }
}

export { optimizer }
