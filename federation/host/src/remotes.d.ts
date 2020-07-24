/// <reference types="react" />

declare module 'remoteA/App' {
  const App: React.FC<{ basePath: string }>
  export default App
}

declare module 'remoteB/App' {
  const App: React.FC<{ basePath: string }>
  export default App
}
