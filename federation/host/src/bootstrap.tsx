import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'

// TODO: how to get history into App for nested routing?
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#app')
)
