import React from 'react'
import { NavLink } from 'react-router-dom'
import { useBasePath } from '../../context/BasePathContext'

const List: React.FC = () => {
  const basePath = useBasePath()

  return (
    <ul>
      <li>
        <NavLink to={`${basePath}/details/1337`}>Item 1337</NavLink>
      </li>
      <li>
        <NavLink to={`${basePath}/details/4711`}>Item 4711</NavLink>
      </li>
    </ul>
  )
}

export default List
