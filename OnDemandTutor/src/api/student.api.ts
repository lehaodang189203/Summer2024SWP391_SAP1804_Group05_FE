import {
  AcceptTutorBody,
  RequestBody,
  RequestTutorBody,
  SelecTutorReqBody,
  UpdateRequest
} from '../types/user.request.type'
import { SuccessResponse, SuccessResponseReq } from './../types/utils.type'

import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'

import { HttpStatusCode } from '../constant/HttpStatusCode.enum'
import { Request } from '../types/request.type'
import { TutorType } from '../types/tutor.type'
import { User } from '../types/user.type'

const user = <User>getProfileFromLS()

export const studentApi = {
  // Tạo yêu cầu
  createRequest: async (body: RequestBody) =>
    await http.post(`student/createRequest?id=${user.id}`, body),

  // Lấy danh sách yêu cầu chờ duyệt
  async pendingRequest() {
    try {
      const response = await http.get<SuccessResponseReq<Request[]>>(
        `Student/pedingRequest?id=${user.id}`
      )
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data
      } else {
        throw new Error('Danh sách trống')
      }
    } catch (error) {
      console.error('Error fetching pending requests:', error)
      throw error
    }
  },

  // Lấy danh sách yêu cầu đã duyệt
  async approvedRequest() {
    try {
      const response = await http.get(`Student/appovedRequest?id=${user.id}`)
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data
      } else {
        throw new Error('Danh sách trống')
      }
    } catch (error) {
      console.error('Lỗi trong quá trình xử lý:', error)
      throw error
    }
  },

  // Xem tất cả yêu cầu tham gia của gia sư
  viewAllTutorsJoinRequests: async (requestId: string) => {
    try {
      const response = await http.get<SuccessResponseReq<TutorType[]>>(
        `Student/viewAllTutorsJoinRequest?idRequest=${requestId}`
      )
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data
      } else {
        throw new Error('Danh sách trống')
      }
    } catch (error) {
      console.error('Lỗi trong quá trình xử lý:', error)
      throw error
    }
  },

  // // Chấp nhận yêu cầu từ một gia sư cụ thể
  acceptTutor: async (body: AcceptTutorBody) => {
    await http.post(
      `student/SelectTutor?idrequest=${body.idRequest}&idaccounttutor=${body.idTutor}`
    )
  },

  // // Đăng ký làm gia sư
  registerAsTutor: async (body: RequestTutorBody) =>
    await http.post(`User/registerAsTutorFB?id=${user.id}`, body),

  updateRequest: async (body: UpdateRequest) =>
    await http.put<SuccessResponse<RequestBody>>(
      `Student/updateRequest?IDRequest=${body.idReq}`,
      body.dataUpdate
    ),

  deleteRequest: async (idRequest: string) =>
    await http.delete<SuccessResponse<any>>(
      `Student/deleteRequest?idRequest=${idRequest}`
    ),

  // select Tutor
  selectTutor: async (body: SelecTutorReqBody) =>
    await http.post<SuccessResponse<any>>(
      `Student/SelectTutor?idRequest=${body.idRequest}&idaccounttutor=${body.idTutor}`
    )
}
