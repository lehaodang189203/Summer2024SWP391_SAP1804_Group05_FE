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
  imageQualification: object
}

export interface ResReqBody {
  email: string
  username: string
  password: string

  date_of_birth: string // Sử dụng Date để biểu diễn ngày tháng
  gender: string
  phone: string
}

export interface LogoutReqBody {
  refreshToken: string
}
export interface reqDeposit{
  firstName: string
  lastName:string
  amount: number
}