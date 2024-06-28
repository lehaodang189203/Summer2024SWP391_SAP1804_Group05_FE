import {
  RequestBody,
  RequestTutorBody,
  acceptTutorBody
} from '../types/user.request.type'
import { SuccessResponseReq } from './../types/utils.type'

import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'

import { User } from '../types/user.type'
import { HttpStatusCode } from '../constant/HttpStatusCode.enum'
import { DataType } from '../types/request.type'

const user = <User>getProfileFromLS()

export const studentApi = {
  // Tạo yêu cầu
  createRequest: async (body: RequestBody) =>
    await http.post(`student/createRequest?id=${user.id}`, body),

  // Lấy danh sách yêu cầu chờ duyệt
  async pendingRequest() {
    try {
      const response = await http.get<SuccessResponseReq<DataType[]>>(
        `student/pendingRequest?IDAccount=${user.id}`
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
      const response = await http.get(`student/approvedRequest?id=${user.id}`)
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data
      } else {
        throw new Error('Danh sách trống')
      }
    } catch (error) {
      console.error('Error fetching approved requests:', error)
      throw error
    }
  },

  // Xem tất cả yêu cầu tham gia của gia sư
  viewAllTutorsJoinRequests(idReq: string) {
    return http.get<any>(`Student/viewAllTutorsJoinRequest?requestId=${idReq}`)
  },

  // Chấp nhận yêu cầu từ một gia sư cụ thể
  acceptTutor: async (body: acceptTutorBody) => {
    await http.post(
      `student/SelectTutor?idrequest=${body.idre}&idaccounttutor=${body.idtu}`,
      body
    )
  },

  // Đăng ký làm gia sư
  registerAsTutor: async (body: RequestTutorBody) =>
    await http.post(`User/registerAsTutorFB?id=${user.id}`, body)
}
