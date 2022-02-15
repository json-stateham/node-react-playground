import { useEffect, useRef, useState } from 'react'

const App = () => {
  const [date, setDate] = useState('')
  let sseRef = useRef<EventSource>().current

  useEffect(() => {
    sseRef = new EventSource(`http://localhost:5000/sse`)

    sseRef.addEventListener('open', () => {
      console.log('SSE opened!')
    })

    sseRef.addEventListener('message', e => {
      console.log(e.data)
      setDate(e.data)
    })

    sseRef.addEventListener('error', e => {
      console.error('Error: ', e)
    })

    return () => sseRef?.close()
  }, [])

  return (
    <div>
      <h1>Server-sent-event message from Node-server</h1>
      <hr />
      <h3>Today: {date}</h3>
    </div>
  )
}

export { App }
