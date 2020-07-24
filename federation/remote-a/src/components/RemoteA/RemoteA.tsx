import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const Headline = styled.h2`
  font-weight: 500;
`

const RemoteA: React.FC = () => {
  return (
    <>
      <Headline>Remote A</Headline>
      <Button variant="contained" color="primary">
        pink remote button
      </Button>
    </>
  )
}

export default RemoteA
