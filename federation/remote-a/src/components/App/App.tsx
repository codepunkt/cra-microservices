import React from 'react'

const Frame = React.lazy(() => import('host/Frame'))

const App: React.FC = () => {
  return (
    <React.Suspense fallback={'loading frame...'}>
      <Frame />
    </React.Suspense>
  )
}

export default App
