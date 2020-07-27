import React from 'react'
import RouteDefinitions from '../RouteDefinitions/RouteDefinitions'
import styled from 'styled-components'
import { BasePathProvider } from '../../context/BasePathContext'

const Headline = styled.h2`
  font-weight: 500;
`

type ContentProps = {
  basePath?: string
}

const Content: React.FC<ContentProps> = ({ basePath = '' }) => {
  return (
    <BasePathProvider value={basePath}>
      <Headline>Remote B</Headline>
      <RouteDefinitions />
    </BasePathProvider>
  )
}

export default Content
