import { useEffect } from 'react'
import { useSSE } from './useSSE'

const SSE = () => {
  const { data, status, connectSSE, disconnectSSE } = useSSE()

  useEffect(() => connectSSE(), [])

  return (
    <div>
      <h1>Server-sent-event message from Node-server</h1>
      <hr />
      <h3>Today: {data}</h3>
      <h3>SSE Status: {status}</h3>
      <button onClick={connectSSE}>Connect</button>
      <button onClick={disconnectSSE}>Close connection</button>
    </div>
  )
}

export { SSE }
