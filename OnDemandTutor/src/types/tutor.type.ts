export interface TutorType {
  id: string
  fullName: string
  date_of_birth: string
  gender: string
  specializedSkills: string
  experience: number
  subject: string
  qualifiCationName: string
  type: string
  imageQualifiCation: string
  introduction: string
}
export interface AdminTutorType {
  id: string
  fullName: string
  date_of_birth: string
  gender: string
  specializedSkills: string
  experience: number
  subject: string
  qualifiCationName: string
  type: string
  imageQualification: string
  introduction: string
}
interface AdminStudentReq {
  idrequest: string
  fullname: string
  subject: string
  title: string
  timetable:string
  price: number
  description: string
  class: string
  learningmethod: string
  date: string
  timestart: string
  timeend: string
}
