import http from '../utils/http'
import { ResATReqBody } from '../types/user.request.type'


  
export const regisApi = {
  registerAT: (body:ResATReqBody) => http.post<any>('/Account/RegisterAsTuTor?IDAccount=1',body)
}