import React, { createContext, useState } from 'react'
import {
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS
} from '../utils/auth'
import { User } from '../types/user.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  refreshToken: string
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
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

  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        refreshToken,
        setRefreshToken
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
