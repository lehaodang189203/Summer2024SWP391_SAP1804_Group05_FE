import { HttpStatusCode } from '../constant/HttpStatusCode.enum'
import { Request } from '../types/request.type'
import { TutorProfile, TutorType } from '../types/tutor.type'
import { JoinClassBody } from '../types/user.request.type'

import { SuccessResponse, SuccessResponseReq } from '../types/utils.type'
import http from '../utils/http'

export const tutorApi = {
  getProfileTT(id: string) {
    return http.get<SuccessResponseReq<TutorProfile>>(
      `tutor/GetProfileTutor?id=${id}`
    )
  },

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
      `tutor/join-request?requestId=${body.requestId}&id=${body.id}`
    )
}
