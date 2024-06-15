import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  access_Token: string
  refresh_Token: string
  user: User
}>
