import { HttpStatusCode } from '../constant/HttpStatusCode.enum'
import { Request } from '../types/request.type'
import { JoinClassBody } from '../types/user.request.type'

import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

export const tutorApi = {
  viewRequest: async (): Promise<Request[]> => {
    try {
      const response = await http.get<SuccessResponse<Request[]>>(
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
  joinClass: async (body: JoinClassBody) =>
    await http.post<SuccessResponse<any>>(
      `tutor/join-request?requestId=${body.idRequest}&id=${body.id}`
    )
}
