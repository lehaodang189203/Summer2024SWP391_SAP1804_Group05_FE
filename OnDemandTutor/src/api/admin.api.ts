import { HttpStatusCode } from "axios"
import { AdminTutorType } from "../types/tutor.type"
import { SuccessResponseReq } from "../types/utils.type"
import http from "../utils/http"
import { RequestModerator } from "../types/request.type"

export const adminAPI= {
    async getTutorList(){
        try {
            const response = await http.get<SuccessResponseReq<AdminTutorType[]>>(
              `/Admin/viewAllTutor`
            )
            if (response.status === HttpStatusCode.Ok) {
              return response.data.data
            } else {
              throw new Error('responece trống')
            }
          } catch (error) {
            // Handle network or API errors
            throw new Error('Lỗi khi sử dụng api')
          }
    },
    async getRequestTutorReg() {
      try {
        const response = await http.get<SuccessResponseReq<AdminTutorType[]>>(
          `/Admin/viewAllRequestReject`
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
    async deleteAccount(id:string){
        try {
            const response = await http.delete<SuccessResponseReq<any>>(
              `/Admin/DeleteAccount?id=${id}`
            )
            if (response.status === HttpStatusCode.Ok) {
              return response.data.data
            } else {
              throw new Error('responece trống')
            }
          } catch (error) {
            // Handle network or API errors
            throw new Error('Lỗi khi sử dụng api')
          }
    },
    async getStudentReq() {
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
    async getStudentReqApproved() {
      try {
        const response = await http.get<SuccessResponseReq<RequestModerator[]>>(
          `/Admin/viewAllRequestApproved`
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
    async getStudentReqRejected() {
      try {
        const response = await http.get<SuccessResponseReq<RequestModerator[]>>(
          `/Admin/viewAllRequestReject`
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
    async getStudentList() {
      try {
        const response = await http.get<SuccessResponseReq<DataTypeStu[]>>(
          `/Admin/viewAllStudent`
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
    async deleteReq(id:string){
      try {
          const response = await http.delete<SuccessResponseReq<any>>(
            ``
          )
          if (response.status === HttpStatusCode.Ok) {
            return response.data.data
          } else {
            throw new Error('responece trống')
          }
        } catch (error) {
          // Handle network or API errors
          throw new Error('Lỗi khi sử dụng api')
        }
  },
}