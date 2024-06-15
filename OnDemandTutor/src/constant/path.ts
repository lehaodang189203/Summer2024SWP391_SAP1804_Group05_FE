export const path = {
  home: '/',
  login: '/login',
  user: '/user',
  register: '/register',
  registerAsTutor: '/registerAsTutor',
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
  Moderator: {
    mod: '/mod',
    listReRegisterTT: '/modaretor/listTutor',
    confirmProfileRegisterTT: '/modaretor/confirmProfile',
    confirmReRegisterTT: '/modaretor/confirmRequest'
  },
  Admin: {
    admin: '/admin', // phair laf /admin
    tutorList: '/admin/tutorList',
    confirmProfileRegisterTT: '/admin/tutorList/confirmProfileRegisterTT',
    rejectProfileRegisterTT: '/admin/tutorList/rejectProfileRegisterTT',
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
