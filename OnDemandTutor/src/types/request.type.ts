import { UserSchema } from '../utils/rules'
import { TutorRep, User, UserRep } from './user.type'
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
  current?: string
}

export interface Classrequest {
  idClassRequest: string
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

  user: UserRep
  tutor: TutorRep
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

export interface ServiceTutor {
  idService: string
  pricePerHour: number
  title: string
  description: string
  learningMethod: string
  class: string
  subject: string
  schedule: [
    {
      date: string
      timeSlots: string[]
    }
  ]
}

export interface ReviewType {
  idUser: string
  feedBack: string
  rating: number
  idClassRequest: string
}
export interface ReviewServiceType {
  idUser: string
  feedBack: string
  rating: number
  idBooking: string
}
export interface BookedServices {
  idBooking: string
  title: string
  subject: string
  price: 50000
  description: string
  class: string
  learningMethod: string
  date: string
  timeSlot: string
  status: string
  user: {
    idUser: string
    name: string
    email: string
    date_of_birth: string
    gender: string
    avatar: string
    address: string
    phone: string
  }
  tutor: {
    idAccountTutor: string
    name: string
    email: string
    date_of_birth: string
    gender: string
    avatar: string
    address: string
    phone: string
  }
}
