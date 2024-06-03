import { AuthResponse } from '../types/auth.type'
import { LoginReqBody } from '../types/user.request.type'
import http from '../utils/http'

export const authApi = {
  loginAccount: (body: LoginReqBody) => http.post<any>('/login', body),

  logoutAccount: () => http.post('/logout')
}
