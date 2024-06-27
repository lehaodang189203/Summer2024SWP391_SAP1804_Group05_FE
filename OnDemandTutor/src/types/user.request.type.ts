export interface LoginReqBody {
  email: string
  password: string
}

export interface ForgotPasswordReqBody {
  email: string
}
export interface ResATReqBody {
  qualificationName: string
  type: string
  field: string
  experience: Number
  specializedSkills: string
  imageQualification: string
}

export interface ResReqBody {
  email: string
  fullName: string
  password: string
  date_of_birth: string // Sử dụng Date để biểu diễn ngày tháng
  gender: string
  phone: string
}

export interface UpdateReqBody {
  fullName: string
  address: string
  avatar: string
  date_of_birth: string // Sử dụng Date để biểu diễn ngày tháng
  gender: string
  phone: string
}

export interface LogoutReqBody {
  refresh_token: string
}
export interface reqDeposit {
  id: string
  amount: number
}

export interface RequestBody {
  class: string
  timetable: string
  description: string
  learningmethod: string
  price: number
  subject: string
  timestart: string
  timeend: string
  title: string
  totalsessions: number
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

export interface ChangePasswordReqBody {
  password: string
  new_password: string
}
export interface joinClassBody {
  requestId: string
  id: string
}
export interface acceptTutorBody {
  idtu: string
  idre: string
}
