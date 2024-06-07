export interface LoginReqBody {
  username: string
  password: string
}
export interface RegisterATReqBody {
  username: string
  password: string
  email: string
  firstName :string
  lastName:string
  hotline:string
  gender:string
  birthDay:string
  file:any
}
export interface ResReqBody {
  username: string,
  password: string,
  password_confirm: string,
  firstName: string,
  lastName: string,
  email:string,
  birthDate: string,
  gender: string
}
