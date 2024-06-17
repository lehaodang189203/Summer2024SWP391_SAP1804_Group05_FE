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
  fullName: string
  password: string
  date_of_birth: string // Sử dụng Date để biểu diễn ngày tháng
  gender: string
  phone: string
}

export interface LogoutReqBody {
  refresh_token: string
}
export interface reqDeposit {
  firstName: string
  lastName: string
  amount: number
}

export interface RequestBody {
  class: string
  date: string
  description: string
  LearningMethod: string
  price: number
  subject: string
  timeStart: string
  timeEnd: string
  title: string
}

export interface RequestResult {
  id: string
  fullName: string
  subject: string
  title: string
  price: 0
  description: string

  methodLearning: string
  date: string
  timeStart: string
  timeEnd: string
}
