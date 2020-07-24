import React from 'react'

const BasePathContext = React.createContext('/')

export const BasePathProvider: React.FC<{ value: string }> = ({
  children,
  value,
}) => {
  return (
    <BasePathContext.Provider value={value}>
      {children}
    </BasePathContext.Provider>
  )
}

export const useBasePath = () => {
  const basePath = React.useContext(BasePathContext)
  return basePath
}
