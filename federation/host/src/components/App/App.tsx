import React from 'react'
import Button from '@material-ui/core/Button'
import Frame from '../Frame/Frame'

const App: React.FC = () => {
  return (
    <Frame>
      <Button variant="contained" color="primary">
        Green host button
      </Button>
    </Frame>
  )
}

export default App
