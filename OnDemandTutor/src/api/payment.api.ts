
import http from '../utils/http'
import { reqDeposit } from '../types/user.request.type'
export const paymentApi ={
    deposit: async (body : reqDeposit)=>{  await http.post<any>('/payment/paymentCallBack?id=9a6b027c-db68-4a58-b968-ead29d403a75', body)

    },
    payment: () => {

    }
}