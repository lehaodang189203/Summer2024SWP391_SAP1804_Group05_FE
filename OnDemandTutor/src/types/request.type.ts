import { UserSchema } from '../utils/rules'
import { TutorType } from './tutor.type'
import { User } from './user.type'
export interface Request {
  idRequest: string
  totalSession: number
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
  totalSession: number
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
  totalSession: number
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
