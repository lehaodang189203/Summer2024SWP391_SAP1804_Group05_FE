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

export interface UpdateProfileBody {
  fullName: string
  address: string
  avatar: string
  date_of_birth: string // Sử dụng Date để biểu diễn ngày tháng
  gender: string
  phone: string
  roles: string
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
  timeTable: string
  description: string
  learningMethod: string
  price: number
  subject: string
  timeStart: string
  timeEnd: string
  title: string
  totalSessions: number
}

export interface RequestTutorBody {
  specializedSkills: string
  experience: number
  subject: string
  qualifiCationName: string
  type: string
  introduction: string
  imageQualification: string
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

export interface UpdateRequest {
  idReq: string
  dataUpdate: RequestBody
}

export interface ChangePasswordReqBody {
  password: string
  new_password: string
}
export interface JoinClassBody {
  idRequest: string
  id: string
}
export interface AcceptTutorBody {
  idTutor: string
  idRequest: string
}

// idTutor là id của account có roles là tutor
// id là account có roles là học sinh

//  requestList
//  student.api
// tutorList
