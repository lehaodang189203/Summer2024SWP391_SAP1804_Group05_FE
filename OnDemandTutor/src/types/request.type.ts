import { UserSchema } from '../utils/rules'
export interface Request {
  idRequest: string
  totalSessions: number
  subject: string
  title: string
  price: number
  description: string
  class: string
  learningMethod: string
  timeTable: string
  timeStart: string
  timeEnd: string
  status: string
}

export interface RequestModerator {
  idRequest: string
  totalSessions: number
  subject: string
  title: string
  price: number
  description: string
  class: string
  learningMethod: string
  timeTable: string
  timeStart: string
  timeEnd: string
  status: string
  fullName: string
}

export interface ClassType {
  totalSessions: number
  subject: string
  title: string
  price: number
  description: string
  class: string
  learningMethod: string
  timeTable: string
  timeStart: string
  timeEnd: string

  User: UserSchema
  Tutor: UserSchema
}
