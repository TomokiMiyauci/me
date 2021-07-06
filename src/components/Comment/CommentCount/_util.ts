import { MouseEventHandler } from 'react'

const handleClick: MouseEventHandler = (ev) => {
  ev.preventDefault()
  const el = document.getElementById('comment')
  if (el) {
    scroll({
      top: el.offsetTop,
      behavior: 'smooth'
    })
  }
}

export { handleClick }
