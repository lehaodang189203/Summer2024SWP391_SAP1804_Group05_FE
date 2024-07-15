import { HttpStatusCode } from '../constant/HttpStatusCode.enum'
import { Request, RequestModerator } from '../types/request.type'
import { TutorType } from '../types/tutor.type'
import { User } from '../types/user.type'
import { SuccessResponse, SuccessResponseReq } from '../types/utils.type'
//import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'

// const user = <User>getProfileFromLS()

// if (user) {
//   console.log(user)
// } else {
//   console.log('Không có')
// }
//DataType[]
export const moderatorApi = {
  async viewRequests() {
    try {
      const response = await http.get<SuccessResponseReq<RequestModerator[]>>(
        `/modaretor/viewRequest`
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
  approvedRequest: async (ReqID: string) =>
    await http.put<SuccessResponse<any>>(
      `modaretor/approvedRequest?requestId=${ReqID}`
    ),

  rejectRequest: async ({ idReq, reason }: { idReq: string; reason: string }) =>
    await http.put(`modaretor/rejectRequest?requestId=${idReq}`, { reason }),

  getRequestTutorReg: async (): Promise<TutorType[]> => {
    try {
      const response = await http.get<SuccessResponseReq<TutorType[]>>(
        'modaretor/viewListTutor'
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
  approvedTutorReg: async (tutorReqID: string) =>
    await http.put(`modaretor/approveProfile?id=${tutorReqID}`),

  rejectTutorReg: async ({
    tutorReqID,
    reason
  }: {
    tutorReqID: string
    reason: string
  }) => await http.put(`modaretor/rejectProfile?id=${tutorReqID}`, { reason }),

  getAccount: async (): Promise<User[]> => {
    try {
      const response = await http.get<User[]>('user/getAllUser')
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      } else {
        throw new Error('Danh sách trống')
      }
    } catch (error) {
      // Handle network or API errors
      throw new Error('Failed to fetch data')
    }
  },

  deleteRequest: async (idRequest: string) =>
    await http.delete<SuccessResponse<any>>(
      `modaretor/DeleteRequest?idRequest=${idRequest}`
    ),

  //  chưa có
  deleteService: async (idService: string) =>
    await http.delete<SuccessResponse<any>>(
      `modaretor/DeleteService?idRequest=${idService}`
    )
}
