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
import {
  Classrequest,
  Request,
  ReviewServiceType,
  ReviewType,
  ServiceTutor
} from '../types/request.type'
import { TutorType } from '../types/tutor.type'
import { User } from '../types/user.type'
import { DataType } from '../pages/Sevice/components/ModalChooseService/ModalChooseService'

const user = <User>getProfileFromLS()

export const studentApi = {
  // Tạo yêu cầu
  createRequest: async (id: string, body: RequestBody) =>
    await http.post(`student/createRequest?id=${id}`, body),

  // Lấy danh sách yêu cầu chờ duyệt
  async pendingRequest(id: string) {
    try {
      const response = await http.get<SuccessResponseReq<Request[]>>(
        `Student/pedingRequest?id=${id}`
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
  async approvedRequest(id: string) {
    try {
      const response = await http.get(`Student/appovedRequest?id=${id}`)
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
  registerAsTutor: async (body: RequestTutorBody, id: string) =>
    await http.post<SuccessResponse<any>>(
      `/User/registerAsTutor?id=${id}`,
      body
    ),

  updateRequest: async (body: UpdateRequest) =>
    await http.put<SuccessResponse<RequestBody>>(
      `Student/updateRequest?IDRequest=${body.idReq}`,
      body.dataUpdate
    ),

  deleteRequest: async (idRequest: string) =>
    await http.delete<SuccessResponse<any>>(
      `Student/deleteRequest?id=${user.id}&idRequest=${idRequest}`
    ),

  // select Tutor
  selectTutor: async (body: SelecTutorReqBody) =>
    await http.post<SuccessResponse<any>>(
      `Student/SelectTutor?idRequest=${body.idRequest}&idaccounttutor=${body.idTutor}`
    ),

  //  lấy lớp học đang diễn ra
  classActive(id: string) {
    return http.get<SuccessResponseReq<Classrequest>>(
      `User/ViewClassRequest?id=${id}`
    )
  },
  createComplaint(body: {
    idUser: string
    description: string
    idAccountTutor: string
  }) {
    return http.post<SuccessResponseReq<string>>(
      `Student/CreateComplaint`,
      body
    )
  },

  classCompled(idClassRequest: string) {
    return http.put<SuccessResponseReq<any>>(
      `Student/CompleteClassRequest?idClassRequest=${idClassRequest}`
    )
  },
  serviceCompled(idBooking: string) {
    return http.put<SuccessResponseReq<any>>(
      `Student/CompleteClassService?idBooking=${idBooking}`
    )
  },
  BookingServiceLearning: async (
    id: string,
    serviceID: string,
    body: DataType
  ) => {
    console.log('BookingServiceLearning', serviceID)

    try {
      const response = await http.post<SuccessResponseReq<string>>(
        `Student/BookingServiceLearning?id=${id}&idService=${serviceID} `,
        body
      )
      if (response.status === HttpStatusCode.Ok) {
        return response
      } else {
        throw new Error('Danh sách trống')
      }
    } catch (error) {
      console.error('Lỗi trong quá trình xử lý:', error)
      throw error
    }
  },

  GetAllService() {
    return http.get<SuccessResponseReq<ServiceTutor[]>>('Student/GetAllService')
  },

  CreateReview: async (body: ReviewType) => {
    return await http.post<SuccessResponseReq<string>>(
      'Student/CreateReviewRequest',
      body
    )
  },
  CreateServiceReview: async (body: ReviewServiceType) => {
    return await http.post<SuccessResponseReq<string>>(
      'Student/CreateReviewService',
      body
    )
  }
}
