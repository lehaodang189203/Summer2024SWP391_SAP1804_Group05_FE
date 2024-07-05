import { HttpStatusCode } from '../constant/HttpStatusCode.enum'
import { Request } from '../types/request.type'
import { DataService } from '../types/tutor.type'
import { JoinClassBody } from '../types/user.request.type'
import { User } from '../types/user.type'
import { SuccessResponse, SuccessResponseReq } from '../types/utils.type'
import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'
const user = <User>getProfileFromLS();

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
      `tutor/join-request?requestId=${body.requestId}&id=${body.id}`
    )
  ,
  createService: async (body:DataService)=> { //hiện tại tui để any trước
    try {
      console.log('check api body',body)
      const response = await http.post<any>(//hiện tại tui để any trước
        `/tutor/createService?id=${user.id}`,body
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
  }
}
