import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from '../constant/HttpStatusCode.enum'

// do là token hết hạn chúng ta không nên chơi reload trang chún ta dùng cách này
export const LocalStrorageEventTarget = new EventTarget()

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error as any)
}

//  đây là hàm dùng để check lỗi có phải 422
export function isAxiosUnprocessableEntityError<FromError>(
  error: unknown
): error is AxiosError<FromError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  )
}
