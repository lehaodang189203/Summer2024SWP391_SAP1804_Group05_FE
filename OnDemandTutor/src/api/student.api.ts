import { RequestBody } from '../types/user.request.type'
import { SuccessResponseReq } from './../types/utils.type'

import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'

import { User } from '../types/user.type'
import { HttpStatusCode } from '../constant/HttpStatusCode.enum'
import { DataType } from '../types/request.type'
const user = <User>getProfileFromLS()

export const studentApi = {
  //  tạo
  createRequest: async (body: RequestBody) =>
    await http.post(`student/createRequest?IDAccount=${user.id}`, body),

  async pedingRequest() {
    try {
      const response = await http.get<SuccessResponseReq<DataType[]>>(
        `student/pedingRequest?IDAccount=${user.id}`
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

  async appoovedequest() {
    try {
      const response = await http.get(
        `student/appovedRequest?IDAccount=${user.id}`
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

  viewAllTutorsJoinRequests(idReq: string) {
    return http.get(`student/appovedRequest?IDAccount=${idReq}`)
  }
}
