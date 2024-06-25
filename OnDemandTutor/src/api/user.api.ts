import {
  ChangePasswordReqBody,
  ForgotPasswordReqBody
} from './../types/user.request.type'
import { User } from '../types/user.type'
import { SuccessResponse, SuccessResponseReq } from '../types/utils.type'
import { getProfileFromLS } from '../utils/auth'
import http from '../utils/http'

const user = <User>getProfileFromLS()

interface BodyUpdateProfile
  extends Omit<User, 'id' | 'roles' | 'accountBalance' | 'email'> {}

//  id: string
//  roles: string
//  gender: string
//  email: string
//  fullName: string
//  date_of_birth: ''
//  address: string
//  phone: string
//  avatar: string
//  accountBalance: string

const userApi = {
  getProfile() {
    return http.get<SuccessResponseReq<User>>(`user/getProfile?id=${user.id}`)
  },
  async updateProfile(body: BodyUpdateProfile) {
    return await http.put<SuccessResponse<User>>(
      `user/updateProfile?id=${user.id}`,
      body
    )
  },
  async uploadAvatar(body: FormData) {
    return await http.put<SuccessResponse<string>>(
      `user/UpdateAvatar?id=${user.id}`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  },

  async changePassword(body: ChangePasswordReqBody) {
    // Gửi yêu cầu HTTP PUT
    return await http.put(`user/ChangePassword?id=${user.id}`, body)
  },

  async forgotPassword(body: ForgotPasswordReqBody) {
    return await http.put(`user/ForgotPassword?Email=${body.email}`)
  }
}

export default userApi
