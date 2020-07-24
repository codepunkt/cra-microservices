import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

// TODO: test these import paths
// import rofl from 'src/rofl'

const RemoteA = React.lazy(() => import('remoteA/App'))
const RemoteB = React.lazy(() => import('remoteB/App'))

const Headline = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  color: hotpink;
`

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#bada55',
    },
  },
})

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Headline>
          <Link to="/">Host</Link>
        </Headline>
        <Button variant="contained" color="primary">
          green host button
        </Button>
        <nav>
          <div>
            <Link to="/a">Remote A</Link>
          </div>
          <div>
            <Link to="/b">Remote B</Link>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/a" />} />
          <Route path="/a" component={RemoteA} />
          <Route path="/b" component={RemoteB} />
          {/* <Route exact path="/details/:id" component={Details} /> */}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
)
