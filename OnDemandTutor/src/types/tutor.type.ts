export interface TutorType {
  id: string
  fullName: string
  date_of_birth: string
  gender: string
  avatar: string
  specializedSkills: string
  experience: number
  subject: string
  qualifiCationName: string
  type: string
  imageQualification: string
  introduction: string
}

export interface UpdateTutorProfile {
  specializedSkill: string
  experience: number
  introduction: string
}

export interface AddQualification {
  name: string
  img: string
  type: string
}

export interface TutorProfile {
  speacializedSkill: string
  experience: number
  introduction: string
  subjects: string
  qualifications: {
    id: string
    name: string
    img: string
    type: string
  }
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
  timetable: string
  price: number
  description: string
  class: string
  learningmethod: string
  date: string
  timestart: string
  timeend: string
}
export interface DataService {
  pricePerHour: number
  title: string
  subject: string
  class: string
  description: string
  learningMethod: string
  schedule: {
    timeSlots?: string[] | undefined
    date: string
  }[]
}
