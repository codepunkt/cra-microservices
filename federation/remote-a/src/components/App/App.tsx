import React from 'react'
import { createBrowserHistory, History } from 'history'
import { Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import RemoteA from '../RemoteA/RemoteA'

type AppProps = {
  history?: History
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff69b4',
    },
  },
})

export const App: React.FC<AppProps> = ({
  history = createBrowserHistory(),
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <RemoteA />
      </Router>
    </ThemeProvider>
  )
}
