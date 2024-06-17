import { AuthResponse } from '../types/auth.type'
import {
  LoginReqBody,
  LogoutReqBody,
  RequestBody,
  ResReqBody
} from '../types/user.request.type'
import { User } from '../types/user.type'
import { SuccessResponse } from '../types/utils.type'
import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'

const user = <User>getProfileFromLS()

if (user) {
  console.log(user)
} else {
  console.log('Không có')
}

export const studentApi = {
  createRequest: async (body: RequestBody) =>
    await http.post(`student/createRequest?IDAccount=${user.id}`, body),
  registerAccount: async (body: ResReqBody) =>
    await http.post<AuthResponse>('user/register', body),
  // loginGoogle : async () =>
  //   await http.post<any>('/signin-google'),
  // logoutAccount: () => http.post('/logout')

  logoutAccount: async (body: LogoutReqBody) =>
    await http.post('user/logout', body)
}
