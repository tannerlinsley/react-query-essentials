import React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </>
  )
}
