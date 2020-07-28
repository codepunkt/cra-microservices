import React from 'react'

const Content = React.lazy(() => import('./components/Content/Content'))

const navigationConfig = {
  pathPrefix: '/a',
  routes: [{ path: '', component: Content }],
}

export default navigationConfig
