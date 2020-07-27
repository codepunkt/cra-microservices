/// <reference types="react" />

declare module 'remoteA/Content' {
  const Content: React.FC<{ basePath: string }>
  export default Content
}

declare module 'remoteB/Content' {
  const Content: React.FC<{ basePath: string }>
  export default Content
}
