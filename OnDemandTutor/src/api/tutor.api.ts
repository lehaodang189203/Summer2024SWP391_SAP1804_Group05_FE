import { HttpStatusCode } from '../constant/HttpStatusCode.enum'
import { DataType } from '../types/request.type'
import { joinClassBody } from '../types/user.request.type'
import { User } from '../types/user.type'
import { SuccessResponse } from '../types/utils.type'
import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'



const user:User = getProfileFromLS()


export const tutorApi = {
  viewRequest: async (): Promise<DataType[]> => {
    try {
      const response = await http.get<SuccessResponse<DataType[]>>(
        'tutor/viewRequest'
      )
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data
      } else {
        throw new Error('Danh sách trống')
      }
    } catch (error) {
      // Handle network or API errors
      throw new Error('Failed to fetch data')
    }
  },
  //  tham gia lớp
  joinClass: async (body:joinClassBody) =>
    await http.post(`tutor/join-request?requestId=${body.requestId}&id=${body.id}`)
}
