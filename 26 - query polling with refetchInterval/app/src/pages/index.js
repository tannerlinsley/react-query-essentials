import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function Posts() {
  const timeQuery = useQuery(
    'posts',
    async () => {
      return axios.get('/api/time').then(res => res.data)
    },
    {
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  )

  return (
    <div>
      <h1>Server Time {timeQuery.isFetching ? '...' : null}</h1>
      <div>
        {timeQuery.isLoading
          ? 'Loading time...'
          : new Date(timeQuery.data.time).toLocaleString()}
      </div>
    </div>
  )
}
