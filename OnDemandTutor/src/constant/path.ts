

const path = {
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
    mod:'/mod',
    listStudentRequest : '/mod/listStudentRequest',
    tutorList: 'mod/tutorList',
    listReRegisterTT: '/modaretor/listTutor'
  },
  Admin:{
    admin:'/admin', // phair laf /admin
    tutorList:'/admin/tutorList',
    confirmProfileRegisterTT:'/admin/tutorList/confirmProfileRegisterTT',
    rejectProfileRegisterTT: '/admin/tutorList/rejectProfileRegisterTT',// chưa làm 
    studentlist: '/admin/student',
    sessionList: '/admin/sessionList'
  }

} as const

export default path
