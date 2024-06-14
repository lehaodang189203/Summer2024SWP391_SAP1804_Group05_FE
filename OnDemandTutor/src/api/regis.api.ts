import { useParams } from 'react-router-dom'
import http from '../utils/http'
interface RegisterReqBody {
    username: string
    password: string
}
export interface ResATReqBody {
  qualificationName: string
  type: string
  field: string
  experience: Number
  specializedSkills: string
  imageQualification: object
}

  
export const regisApi = {
  register: (body:RegisterReqBody ) => http.post<any>('/register', body),// nhận vào một đối tượng body có kiểu LoginReqBody, hàm sử dụng phương thức post của axios gửi yêu cầu đăng nhập đến endpoint

  registerAT: (body:ResATReqBody) => http.post<any>(('/user/registerAsTutor?IDAccount=1'),body)
  
}