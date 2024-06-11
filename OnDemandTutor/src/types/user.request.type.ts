export interface LoginReqBody {
  email: string
  password: string
}
export interface ResATReqBody {
  qualificationName: string
  type: string
  field: string
  experience: Number
  specializedSkills: string
  imageDegree: object
}

export interface ResReqBody {
  email: string
  username: string
  password: string

  firstname: string
  lastname: string
  date_of_birth: string // Sử dụng Date để biểu diễn ngày tháng
  gender: string
}

export interface LogoutReqBody {
  refreshToken: string
}
