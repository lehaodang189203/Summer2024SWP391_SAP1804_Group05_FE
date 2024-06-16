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

import { toast } from 'react-toastify'
import { path } from '../constant/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        console.log(config)

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
        console.log('status', response.status)
        console.log('required', response.data)

        const { url } = response.config
        console.log(url)

        if (url === path.login || url === path.register) {
          console.log(1111)

          console.log(response.data)

          const data = response.data as AuthResponse
          console.log(data)
          this.accessToken = data.data.access_token
          console.log('accessToken', data.data.access_token)

          this.refreshToken = data.data.refresh_token
          console.log('refreshToken', data.data.refresh_token)

          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
        } else if (url === path.logout) {
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
