import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useBasePath } from '../../context/BasePathContext'

const Detail = React.lazy(() => import('../Detail/Detail'))
const List = React.lazy(() => import('../List/List'))

const RouteDefinitions: React.FC = () => {
  const basePath = useBasePath()

  return (
    <Switch>
      <Suspense fallback="Loading...">
        <Route path={basePath} exact component={List} />
        <Route path={`${basePath}/details/:id`} exact component={Detail} />
      </Suspense>
    </Switch>
  )
}

export default RouteDefinitions
