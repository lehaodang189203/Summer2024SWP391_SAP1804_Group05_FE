import http from '../utils/http'
import { ResATReqBody } from '../types/user.request.type'
interface RegisterReqBody {
    username: string
    password: string
}

  
export const regisApi = {
  register: (body:RegisterReqBody ) => http.post<any>('/register', body),// nhận vào một đối tượng body có kiểu LoginReqBody, hàm sử dụng phương thức post của axios gửi yêu cầu đăng nhập đến endpoint

  registerAT: (body:ResATReqBody) => http.post<any>('/user/registerAsTutor?IDAccount=9a6b027c-db68-4a58-b968-ead29d403a75',body)
}