import React from 'react'
import { BasePathProvider } from '../../context/BasePathContext'
import RouteDefinitions from '../RouteDefinitions/RouteDefinitions'

type AppProps = {
  basePath: string
}

const App: React.FC<AppProps> = ({ basePath }) => {
  return (
    <BasePathProvider value={basePath}>
      <div>Remote B</div>
      <RouteDefinitions />
    </BasePathProvider>
  )
}

export default App
