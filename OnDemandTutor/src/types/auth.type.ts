import { User } from './user.type'
import { SuccessResponse } from './utils.type'

// export type AuthResponse = SuccessResponse<{
//   accessToken: string
//   refreshToken: string
// }>

export type AuthResponse = SuccessResponse<{
  user: {
    id: string
  }
  token: {
    accessToken:string
    refreshToken:string
  }
}>
