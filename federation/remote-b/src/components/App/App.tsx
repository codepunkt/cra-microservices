import React from 'react'
import Content from '../Content/Content'

const Frame = React.lazy(() => import('host/Frame'))

const App: React.FC = () => {
  return (
    <React.Suspense fallback={'loading frame...'}>
      <Frame>
        <Content />
      </Frame>
    </React.Suspense>
  )
}

export default App
