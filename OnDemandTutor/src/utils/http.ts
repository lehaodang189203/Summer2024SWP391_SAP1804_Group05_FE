import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { clearLS, getRefreshTokenFromLS, getTokenFromLS, setAccessTokenToLS } from './auth'
import path from '../constant/path'
import { toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'

class Http {
  instance: AxiosInstance
  private accessToken: string
  // private refreshToken:string

  constructor() {
    this.accessToken = getTokenFromLS()
    this.accessToken = getRefreshTokenFromLS()

    this.instance = axios.create({
      baseURL: 'https://localhost:7133/api/Account/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {

        console.log(config);
        
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
              console.log(data);
              
          this.accessToken = data.data.accessToken
          setAccessTokenToLS(this.accessToken)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        console.log(error);
        
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
