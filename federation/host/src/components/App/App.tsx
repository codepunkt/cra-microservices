import React from 'react'
import FederatedWrapper from '../FederatedWrapper/FederatedWrapper'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'

const RemoteA = React.lazy(() => import('remoteA/App'))
const RemoteB = React.lazy(() => import('remoteB/App'))

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#bada55',
    },
  },
})

// TODO: refresh on /a and /b should work. Right now, it doesn't.
const App: React.FC = () => {
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
        <Button variant="contained" color="primary">
          Button in host (should be green!)
        </Button>

        <Switch>
          <Route exact path="/">
            <Redirect to="/a" />
          </Route>
          <Route path="/a">
            <FederatedWrapper
              error={<div>Could not load remote A</div>}
              delayed={<div>Loading remote A...</div>}
            >
              <RemoteA />
            </FederatedWrapper>
          </Route>
          <Route path="/b">
            <FederatedWrapper
              error={<div>Could not load remote B</div>}
              delayed={<div>Loading remote B...</div>}
            >
              <RemoteB />
            </FederatedWrapper>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
