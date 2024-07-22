export interface User {
  id: string
  roles: string
  gender: string
  email: string
  fullName: string
  date_of_birth: string
  address: string
  phone: string
  avatar: string
  accountBalance: number
}

export interface TutorRep {
  address: string
  avatar: string
  date_of_birth: string
  email: string
  gender: string
  idAccountTutor: string
  name: string
  phone: string
  roles: string
}

export interface UserRep {
  address: string
  avatar: string
  date_of_birth: string
  email: string
  gender: string
  idUser: string
  name: string
  phone: string
  roles: string
}

export interface Notificate {
  idNotification: string
  description: string
  createDate: string
  status: string
}

export interface TransType {
  id: string
  amount: number
  createDate: string
  status: string
  user: {
    id: string
    fullName: string
    email: string
    date_of_birth: string
    gender: string
    avatar: string
    address: string
    phone: string
    roles: string
  }
}
