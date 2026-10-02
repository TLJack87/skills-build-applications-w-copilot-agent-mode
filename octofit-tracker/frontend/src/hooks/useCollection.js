import { useEffect, useState } from 'react'
import { getApiUrl, readCollection } from '../api.js'

export function useCollection(endpoint, request = fetch) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      try {
        const response = await request(getApiUrl(endpoint), { signal: controller.signal })
        const collection = await readCollection(response)
        setRows(collection)
        setError('')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this data.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [endpoint, request, revision])

  return {
    rows,
    loading,
    error,
    refresh: () => setRevision((currentRevision) => currentRevision + 1),
  }
}