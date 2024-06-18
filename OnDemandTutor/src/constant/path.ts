export const path = {
  home: '/',
  login: '/login',
  user: '/user',
  register: '/register',
  registerAsTutor: '/user/registerAsTutor',
  logout: '/Logout',
  tutors: '/tutors',
  profileTT: '/profile',
  requestList: '/requests',
  detailRequest: '/detailRequest',
  calender: '/calender',
  checkOut: '/checkout',
  payment: '/payment',
  deposit: '/deposit',
  changePassword: '/user/changePassword',
  profile: '/user/profile',
  studentViewRequestList:'/studentViewRequestList',
  RequestStudentCurrent:'RequestStudentCurrent',
  Moderator: {
    mod: '/mod',
    listStudentRequest: '/mod/listStudentRequest', //danh sách học sinh tạo req session(phiên học)
    tutorResRegis: '/mod/tutorResRegis', //danh sách giảng viên đăng kí để approved (đang làm)
    tutorPostSession: '/mod/listTutor' // danh sách post giảng viên tạo phiên học

    //danh sách phiên học
    //khiếu nại
  },
  Admin: {
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
