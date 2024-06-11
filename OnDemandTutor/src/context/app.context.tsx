import React, { createContext, useState } from 'react'
import { getAccessTokenFromLS, getRefreshTokenFromLS } from '../utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  refreshToken: string
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  refreshToken: getRefreshTokenFromLS() || '',
  setRefreshToken: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  )

  const [refreshToken, setRefreshToken] = useState<string>(
    initialAppContext.refreshToken
  )

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        refreshToken,
        setRefreshToken
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
