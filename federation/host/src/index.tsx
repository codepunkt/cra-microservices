// import rofl from 'src/rofl'
import React from 'react'
import ReactDOM from 'react-dom'
import rofl from 'src/rofl'

const App: React.FC = () => {
  const [wat, setWat] = React.useState(false)
  return (
    <div>
      HelloO1 World {JSON.stringify(rofl('hallo'))}
      <button onClick={() => setWat((wat) => !wat)}>
        Wat: {wat ? 'true' : 'false'}
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
