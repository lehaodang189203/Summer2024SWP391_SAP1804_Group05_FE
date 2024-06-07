export interface LoginReqBody {
  email: string
  password: string
}

export interface ResReqBody {
  email: string
  password: string
  date_of_birth: Date // Sử dụng Date để biểu diễn ngày tháng

  firstname: string
  lastname: string

  gender: string
}
