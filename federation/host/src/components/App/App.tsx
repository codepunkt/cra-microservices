import React, { Suspense } from 'react'

const RemoteA = React.lazy(() => import('remoteA/App'))
const RemoteB = React.lazy(() => import('remoteB/App'))

export const App: React.FC = () => {
  return (
    <>
      <div>Host</div>
      <Suspense fallback={<>Loading RemoteA...</>}>
        <RemoteA />
      </Suspense>
      <Suspense fallback={<>Loading RemoteB...</>}>
        <RemoteB />
      </Suspense>
    </>
  )
}
