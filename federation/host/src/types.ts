export type NavigationConfig = {
  pathPrefix: string
  routes: Array<{
    path: string
    component: React.ComponentType
  }>
}
