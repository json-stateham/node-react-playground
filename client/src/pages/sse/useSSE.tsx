import { useEffect, useRef, useState } from 'react'

const SSE_STATUS = new Map()
SSE_STATUS.set(0, 'CONNECTING')
SSE_STATUS.set(1, 'OPEN')
SSE_STATUS.set(2, 'CLOSED')
SSE_STATUS.set(3, 'ERROR')

export const useSSE = () => {
  const [data, setData] = useState('')
  const [statusCode, setStatusCode] = useState(0)
  const sseRef = useRef<EventSource>()

  const connectSSE = () => setStatusCode(0)

  const disconnectSSE = () => {
    sseRef?.current?.close()
    setStatusCode(2)
  }

  useEffect(() => {
    if (statusCode === 0 || statusCode === 1) {
      sseRef.current = new EventSource(`http://localhost:5000/sse`)

      sseRef?.current?.addEventListener('open', () => {
        setStatusCode(1)
        console.log('SSE opened!')
      })
      sseRef?.current?.addEventListener('message', e => {
        console.log(e.data)
        setData(e.data)
      })

      sseRef?.current?.addEventListener('error', e => {
        setStatusCode(3)
        console.error('Error: ', e)
      })
    }

    return () => sseRef?.current?.close()
  }, [statusCode])

  const status = SSE_STATUS.get(statusCode)

  return {
    data,
    status,
    connectSSE,
    disconnectSSE,
  }
}
