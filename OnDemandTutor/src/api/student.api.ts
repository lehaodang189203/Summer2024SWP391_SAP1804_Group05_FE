import { DataType } from '../pages/Moderator/Components/StudentRes/StudentRes'
import { StudentResponse } from '../types/auth.type'
import {
  LogoutReqBody,
  RequestBody,
  RequestResult
} from '../types/user.request.type'
import { User } from '../types/user.type'
import { SuccessResponse } from '../types/utils.type'
import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'

const user = <User>getProfileFromLS()

export const studentApi = {
  //  tạo
  createRequest: async (body: RequestBody) =>
    await http.post(`student/createRequest?IDAccount=${user.id}`, body)
}
