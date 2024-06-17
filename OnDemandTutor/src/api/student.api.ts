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

if (user) {
  console.log(user)
} else {
  console.log('Không có')
}

export const studentApi = {
  createRequest: async (body: RequestBody) =>
    await http.post(`student/createRequest?IDAccount=${user.id}`, body),

  getRequest: async (): Promise<DataType[]> => {
    try {
      const response = await http.get<SuccessResponse<DataType[]>>(
        'modaretor/viewRequest'
      )
      if (response.status === 200) {
        return response.data.data
      } else {
        throw new Error('Danh sách trống')
      }
    } catch (error) {
      // Handle network or API errors
      throw new Error('Failed to fetch data')
    }
  }
}
