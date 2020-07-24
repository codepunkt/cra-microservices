import React from 'react'
import { FederatedWrapper } from '../FederatedWrapper/FederatedWrapper'

const RemoteA = React.lazy(() => import('remoteA/App'))
const RemoteB = React.lazy(() => import('remoteB/App'))

export const App: React.FC = () => {
  return (
    <>
      <div>Host</div>
      <FederatedWrapper
        error={<div>Temporary remote A</div>}
        delayed={<div>Loading remote A...</div>}
      >
        <RemoteA />
      </FederatedWrapper>
      <FederatedWrapper
        error={<div>Temporary remote B</div>}
        delayed={<div>Loading remote B...</div>}
      >
        <RemoteB />
      </FederatedWrapper>
    </>
  )
}
