import { HttpStatusCode } from '../constant/HttpStatusCode.enum'
import { Request } from '../types/request.type'

import { SuccessResponse, SuccessResponseReq } from '../types/utils.type'

import {
  AddQualification,
  CreatServiceType,
  TutorProfile,
  UpdateTutorProfile
} from '../types/tutor.type'
import { JoinClassBody } from '../types/user.request.type'
import { User } from '../types/user.type'

import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'

const user = <User>getProfileFromLS()

export const tutorApi = {
  getProfileTT: async (id: string): Promise<TutorProfile> => {
    try {
      const response = await http.get<SuccessResponseReq<TutorProfile>>(
        `tutor/GetProfileTutor?id=${id}`
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

  viewRequest: async (id: string): Promise<Request[]> => {
    try {
      const response = await http.get<SuccessResponse<Request[]>>(
        `tutor/viewRequest?id=${id}`
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
    ),

  createService: async (id: string, body: CreatServiceType) => {
    try {
      const response = await http.post<SuccessResponseReq<string>>(
        `/tutor/createService?id=${id}`,
        body
      )
      console.log('response', response)
      if (response.status === HttpStatusCode.Ok) {
        return response.data
      } else {
        throw new Error('Danh sách trống')
      }
    } catch (error) {
      throw new Error('Failed to fetch data')
    }
  },
  async updateProfileTT(id: string, body: UpdateTutorProfile) {
    // console.log('body của res khi call api',body)
    // console.log('người dùng user là',user)
    // console.log(' id người dùng user là',user.id)
    return await http.put<SuccessResponseReq<any>>(
      `tutor/UpdateTutorProfile?id=${id}`,
      body
    )
  },

  addSubject: async (
    id: string,
    subjectName: string
  ): Promise<SuccessResponseReq<any>> => {
    try {
      const response = await http.post<SuccessResponseReq<any>>(
        `tutor/AddSubject?id=${id}&subjectName=${subjectName}`
      )

      return response.data // Return response data if needed
    } catch (error) {
      console.error('lỗi:', error)
      throw error // Re-throw error for handling in caller function
    }
  },
  addQualification: async (
    id: string,
    body: AddQualification
  ): Promise<SuccessResponseReq<any>> => {
    try {
      const response = await http.post<SuccessResponseReq<any>>(
        `tutor/AddQualification?id=${id}`,
        body
      )

      return response.data // Return response data if needed
    } catch (error) {
      console.error('lỗi:', error)
      throw error // Re-throw error for handling in caller function
    }
  }
}
