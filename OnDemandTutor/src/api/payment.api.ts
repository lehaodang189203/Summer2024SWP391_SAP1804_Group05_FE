import { reqDeposit } from '../types/user.request.type'
import { User } from '../types/user.type'
import http from '../utils/http'

export const paymentApi = {
  deposit: async (body: reqDeposit) => {
    const response = await http.post<any>(`payment/payment`, body)
    return response.data
  },
  paymentcallback: async (body: User) => {
    const response = await http.get<any>(
      `payment/paymentCallBack?id=${body.id}`
    )
    return response.data
  }
}
