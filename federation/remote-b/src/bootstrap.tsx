// import rofl from 'src/rofl'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector('#app')
)
