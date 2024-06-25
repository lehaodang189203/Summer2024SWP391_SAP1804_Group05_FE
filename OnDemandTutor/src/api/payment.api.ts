
import http from '../utils/http'
import { reqDeposit } from '../types/user.request.type'
import { getProfileFromLS } from '../utils/auth';
import { User } from '../types/user.type';
const user = getProfileFromLS();
export const paymentApi ={
    deposit: async (body: reqDeposit) => {
        const response = await http.post<any>('payment/payment', body);
        return response.data;
    },
    paymentcallback:async (body:User) => {
         console.log('in ra user paymentcallback nè', body)
         const response = await http.get<any>(`payment/paymentCallBack?id=${body.id}`);
         return response.data;
    }
}