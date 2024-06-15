type Role = 'User' | 'Admin'

export interface User {
  id: string
  roles: Role[]
  gender: string
  email: string
  fullName: string
  date_of_birth: ''
  address: string
  phone: string
  avatar: string
  accountBalance: string
}
