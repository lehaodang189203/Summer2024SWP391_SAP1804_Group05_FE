// Hook useHttp.ts
import { useContext } from 'react'
import { AppContext } from '../context/app.context'
import Http from './http'

export function useHttp() {
  const { setRefreshToken } = useContext(AppContext)
  return new Http(setRefreshToken).instance
}
