import { RequestBody } from '../types/user.request.type'

import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'

import { User } from '../types/user.type'
const user = <User>getProfileFromLS()

export const studentApi = {
  //  tạo
  createRequest: async (body: RequestBody) =>
    await http.post(`student/createRequest?IDAccount=${user.id}`, body)
}
