import { DataType } from '../types/request.type'
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

export const moderatorApi = {
  approvedRequest: async (ReqID: string) =>
    await http.put(`modaretor/approvedRequest?requestId=${ReqID}`),

  rejectRequest: async (ReqID: string) =>
    await http.put(`modaretor/rejectRequest?requestId=${ReqID}`),

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
