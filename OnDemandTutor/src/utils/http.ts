import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS
} from './auth'

import { AuthResponse } from '../types/auth.type'
import config from '../constant/config'
import { pathAuth } from '../constant/path'
import { toast } from 'react-toastify'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        console.log(response)

        const { url } = response.config
        console.log(url)

        if (url === pathAuth.login || url === pathAuth.register) {
          console.log('1')

          console.log(response.data)

          const data = response.data as AuthResponse
          console.log(data)
          this.accessToken = data.data.access_Token
          console.log('accessToken', data.data.access_Token)

          this.refreshToken = data.data.refresh_Token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
        } else if (url === pathAuth.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          console.log(data)

          const message = data?.message || error.message
          console.log(message)

          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
