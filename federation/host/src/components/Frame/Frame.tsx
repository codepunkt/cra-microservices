import React from 'react'
import FederatedWrapper from '../FederatedWrapper/FederatedWrapper'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'

const RemoteA = React.lazy(() => import('remoteA/Content'))
const RemoteB = React.lazy(() => import('remoteB/Content'))

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#bada55',
    },
  },
})

const Frame: React.FC = ({ children }) => {
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

        <Switch>
          <Route exact path="/">
            <Redirect to="/a" />
          </Route>
          <Route path="/a">
            <FederatedWrapper
              error={<div>Could not load remote A</div>}
              delayed={<div>Loading remote A...</div>}
            >
              <RemoteA basePath="/a" />
            </FederatedWrapper>
          </Route>
          <Route path="/b">
            <FederatedWrapper
              error={<div>Could not load remote B</div>}
              delayed={<div>Loading remote B...</div>}
            >
              <RemoteB basePath="/b" />
            </FederatedWrapper>
          </Route>
        </Switch>
        <main>{children}</main>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default Frame
