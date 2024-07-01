export const path = {
  home: '/', // student
  login: '/login', // student
  user: '/user', //student
  register: '/register', //student
  logout: '/Logout', // student
  changePassword: '/user/changePassword', //user
  profile: '/user/profile', //user
  registerAsTutor: '/registerAsTutor', //student
  tutors: '/tutor/:idReq', //student
  checkOut: '/checkout', //student
  paymentcallback: '/paymentcallback', //student
  deposit: '/deposit', //student
  studentViewRequestList: '/studentViewRequestList', //student
  requestStudentCurrent: '/requestStudentCurrent', //student
  requestList: '/requests', //tutor and student
  profileTT: '/user/profileTT', //tutor
  paymentSucsess: '/paymentSucsess',
  paymentFail: '/paymentFail',
  detailRequest: '/detailRequest', //chưa được sử dụng
  calender: '/calender', //calender nèk
  tutorViewRequestList: '/studentViewRequestList', //student
  Moderator: {
    //                                                      mod-------------------------------------
    mod: '/mod',
    listStudentRequest: '/mod/listStudentRequest', //danh sách học sinh tạo req session(phiên học)
    tutorResRegis: '/mod/tutorResRegis', //danh sách giảng viên đăng kí để approved (đang làm)
    tutorPostSession: '/mod/listTutor', // danh sách post giảng viên tạo phiên học
    listAccountStudent: '/mod/listAccountStudent'
    //danh sách phiên học
    //khiếu nại
  },
  Admin: {
    //admin-------------------------------------
    admin: '/admin', // phair laf /admin
    tutorList: '/admin/tutorList',
    confirmProfileRegisterTT: '/admin/tutorList/confirmProfileRegisterTT',
    rejectProfileRegisterTT: '/admin/tutorList/rejectProfileRegisterTT', // chưa làm
    studentlist: '/admin/student',
    sessionList: '/admin/sessionList'
  }
} as const

export const pathAuth = {
  home: '/',
  login: 'user/login',
  user: '/user',
  register: 'user/register',
  registerAsTutor: '/registerAT',
  logout: 'user/Logout',
  tutors: '/tutors',
  profileTT: '/profile',
  requestList: '/requests',
  detailRequest: '/detailRequest',
  calender: '/calender',
  checkOut: '/checkout',
  payment: '/payment',
  deposit: '/deposit',
  changePassword: '/user/changePassword',
  profile: '/user/profile'
} as const
