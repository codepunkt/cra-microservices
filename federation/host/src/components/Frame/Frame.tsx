import React from 'react'
import FederatedWrapper from '../FederatedWrapper/FederatedWrapper'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import { NavigationConfig } from '../../types'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#bada55',
    },
  },
})

const Frame: React.FC = ({ children }) => {
  const [routes, setRoutes] = React.useState<NavigationConfig['routes']>([])

  React.useEffect(() => {
    const loadNavigationConfigurations = async () => {
      const [configA, configB] = (
        await Promise.all([
          import('remoteA/navigationConfig'),
          import('remoteB/navigationConfig'),
        ])
      )
        .map((module) => module.default)
        .map((config) => ({
          ...config,
          routes: config.routes.map((route) => ({
            ...route,
            path: `${config.pathPrefix}${route.path}`,
          })),
        }))
      setRoutes([...configA.routes, ...configB.routes])
    }
    loadNavigationConfigurations()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/a">Remote A</Link>
          </li>
          <li>
            <Link to="/b">Remote B</Link>
          </li>
        </ul>

        <div>
          <div>before</div>
          {JSON.stringify(routes.length)}
          <div>after</div>
        </div>
        <Switch>
          {routes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              <FederatedWrapper
                error={`Could not load remote at path ${route.path}`}
                fallback={<div>Loading remote...</div>}
              >
                <route.component />
              </FederatedWrapper>
            </Route>
          ))}
        </Switch>
        <main>{children}</main>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default Frame
