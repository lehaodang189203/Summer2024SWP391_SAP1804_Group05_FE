import { HttpStatusCode } from '../constant/HttpStatusCode.enum'
import { Request, RequestModerator } from '../types/request.type'
import { User } from '../types/user.type'
import { SuccessResponseReq } from '../types/utils.type'
import { getProfileFromLS } from '../utils/auth'
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
    await http.put(`modaretor/approvedRequest?requestId=${ReqID}`),

  rejectRequest: async (ReqID: string) =>
    await http.put(`modaretor/rejectRequest?requestId=${ReqID}`),

  getRequestTutorReg: async (): Promise<Request[]> => {
    try {
      const response = await http.get<SuccessResponseReq<Request[]>>(
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
  rejectTutorReg: async (tutorReqID: string) =>
    await http.put(`modaretor/rejectProfile?id=${tutorReqID}`),
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
  }
}
