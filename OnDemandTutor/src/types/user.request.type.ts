export interface LoginReqBody {
  email: string
  password: string
}
export interface ResATReqBody {
  email: string
  password: string
  confirm_password: string
  date_of_birth: Date // Sử dụng Date để biểu diễn ngày tháng
  firstname: string
  lastname: string
  gender: string
}

export interface ResReqBody {
  email: string
  username: string
  password: string

  firstname: string
  lastname: string
  date_of_birth: Date // Sử dụng Date để biểu diễn ngày tháng
  gender: string
}
