import React from 'react'
import FederatedWrapper from '../FederatedWrapper/FederatedWrapper'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
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
      const results = await Promise.allSettled([
        import('remoteA/navigationConfig'),
        import('remoteB/navigationConfig'),
        import('remoteC/navigationConfig'),
      ])

      const routes: NavigationConfig['routes'] = []

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          routes.push(
            ...result.value.default.routes.map((route) => ({
              ...route,
              path: `${result.value.default.pathPrefix}${route.path}`,
            }))
          )
        } else {
          console.error(result.reason)
        }
      })

      setRoutes(routes)
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
