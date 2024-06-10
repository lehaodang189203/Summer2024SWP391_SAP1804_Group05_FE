import { AuthResponse } from '../types/auth.type'
import { LoginReqBody, ResReqBody } from '../types/user.request.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

export const authApi = {
  loginAccount: async (body: { email: string; password: string }) =>
    await http.post<AuthResponse>('/login', body), // nhận vào một đối tượng body có kiểu LoginReqBody, hàm sử dụng phương thức post của axios gửi yêu cầu đăng nhập đến endpoint

  registerAccount: async (body: ResReqBody) =>
    await http.post<any>('/register', body),

  logoutAccount: () => http.post('/logout')
}
