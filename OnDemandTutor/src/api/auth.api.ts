import { AuthResponse } from '../types/auth.type'
import { LoginReqBody, ResReqBody } from '../types/user.request.type'
import http from '../utils/http'

export const authApi = {
  loginAccount: (body: LoginReqBody) => http.post<any>('/login', body),// nhận vào một đối tượng body có kiểu LoginReqBody, hàm sử dụng phương thức post của axios gửi yêu cầu đăng nhập đến endpoint

  registerAccount: (body: ResReqBody) => http.post<any>('/register', body),

  logoutAccount: () => http.post('/logout')
}