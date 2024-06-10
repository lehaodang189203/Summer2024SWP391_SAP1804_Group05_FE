import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { clearLS, getTokenFromLS, setAccessTokenToLS } from './auth'
import path from '../constant/path'
import { toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'

class Http {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getTokenFromLS()

    this.instance = axios.create({
      baseURL: 'http://localhost:4000/users',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config

        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse

          this.accessToken = data.data.access_token
          setAccessTokenToLS(this.accessToken)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        //  lỗi khác
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
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
