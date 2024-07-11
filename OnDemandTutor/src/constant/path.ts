export const path = {
  home: '/', // student
  login: '/login', // student
  user: '/user', //student
  register: '/register', //student
  logout: '/Logout', // student
  changePassword: '/user/changePassword', //user
  profile: '/user/profile', //user
  registerAsTutor: '/registerAsTutor', //student
  support: '/support', //student
  tutors: '/tutors', //student
  checkOut: '/checkout', //student
  paymentcallback: '/paymentcallback', //student
  deposit: '/deposit', //student
  studentViewRequestList: '/studentViewRequestList', //student
  requestStudentCurrent: '/requestStudentCurrent', //student
  service: '/Service',
  bookedService: '/bookedService',
  requestList: '/requests', //tutor and student
  profileTT: '/user/profileTT', //tutor
  createService: '/createService', //tutor
  tutorViewServiceNotBooked: '/tutorViewServiceNotBooked',
  tutorViewServiceBooked: '/tutorViewServiceBooked',
  paymentSucsess: '/paymentSucsess',
  paymentFail: '/paymentFail',
  detailRequest: '/detailRequest', //chưa được sử dụng
  calender: '/calender', //calender nèk
  myService:'/myService',
  tutorviewAllOwnService:'/ttService',
  myClassLayout: '/myClassLayout',
  //tutorViewRequestList: '/studentViewRequestList', //student
  myClass: '/myClass',
  DetailInfor: '/DetailInfor',
  Moderator: {
    //                                                      mod-------------------------------------
    mod: '/mod',
    listStudentRequest: '/mod/listStudentRequest', //danh sách học sinh tạo req session(phiên học)
    tutorResRegis: '/mod/tutorResRegis', //danh sách giảng viên đăng kí để approved (đang làm)
    tutorPostSession: '/mod/listTutor', // danh sách post giảng viên tạo phiên học
    listAccountStudent: '/mod/listAccountStudent',
    listComplant: '/mod/listComplant'
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
    adminStudentReq: '/admin/studentReq',
    adminStudentReqApproved: '/admin/studentReqApproved',
    adminStudentReqRejected: '/admin/studentReqRejected',
    TransactionList: 'admin/TransactionList',
    sessionList: '/admin/sessionList',
    dashBoard: '/admin/dashboard',
    listComplant: '/admin/listComplant'
  }
} as const

export const pathAuth = {
  home: '/',
  login: 'user/login',
  user: '/user',
  register: 'user/register',
  registerAsTutor: '/registerAT',
  logout: 'user/logout',
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
