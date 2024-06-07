export interface LoginReqBody {
  email: string
  password: string
}

export interface ResReqBody {
  email: string
<<<<<<< HEAD
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
=======
  password: string
  date_of_birth: Date // Sử dụng Date để biểu diễn ngày tháng

  firstname: string
  lastname: string

>>>>>>> refs/remotes/origin/main
  gender: string
}
