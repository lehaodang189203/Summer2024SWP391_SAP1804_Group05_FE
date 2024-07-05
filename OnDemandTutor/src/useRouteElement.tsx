import { Suspense, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from './constant/path'
import { AppContext } from './context/app.context'
import MainLayout from './layout/MainLayout'
import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
import AdminLayout from './pages/Admin/AdminLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import ModeratorLayout from './pages/Moderator/ModeratorLayout/ModeratorLayout'
import Register from './pages/Register'
import UserLayout from './pages/User/layout/UserLayout'

import AdminConfirmRegister from './pages/Admin/Components/AdminConfirmRegister/AdminConfirmRegister'
import AdminListTutor from './pages/Admin/Components/AdminListTutor'
import AdminRejectRegister from './pages/Admin/Components/AdminRejectRegister'
import SessionList from './pages/Admin/Components/SessionList'
import StudentList from './pages/Admin/Components/AdminStudentList'
import CheckOut from './pages/CheckOut'
import Deposit from './pages/Deposit'
import ModAccountStudent from './pages/Moderator/Components/ModAccountStudent'
import ModTutorResRegis from './pages/Moderator/Components/ModTutorResRegis/ModTutorResRegis'
import StudentRes from './pages/Moderator/Components/StudentRes'
import PaymentCallback from './pages/PaymentCallBack'
import RegisterAsTuTor from './pages/RegisterAsTutor/RegisterAsTutor'
import RequestList from './pages/RequestList'
import ReStuCurrentPage from './pages/StudentViewRequestList/Layout/ReStuCurrentPage'
import ReStuPending from './pages/StudentViewRequestList/Layout/ReStuPending'
import TutorList from './pages/TutorList'
import ChangPassword from './pages/User/pages/ChangePassword'
import Profile from './pages/User/pages/Profile'
// import PaymentSuccess from './pages/PaymentCallBack/PaymentSuccess/PaymentSuccess'
import PaymentFail from './pages/PaymentCallBack/PaymentFail'
import Dashboard from './pages/Admin/Components/Dashboard'
import ProfileTT from './pages/User/pages/ProfileTT'
import PaymentSuccess from './pages/PaymentCallBack/PaymentSuccess/PaymentSuccess'
import AdminStudentReq from './pages/Admin/Components/AdminStudentReq'
import AdminStudentReqApproved from './pages/Admin/Components/AdminStudentReqApproved'
import AdminStudentReqRejected from './pages/Admin/Components/AdminStudentReqRejected'
import MyClass from './pages/MyClass'
import TransactionList from './pages/Admin/Components/TransactionList'
import CreateService from './pages/Sevice/CreateSevice'
import Support from './pages/Support'

function ProtectedRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.register, // user
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        },

        {
          path: path.login, // user
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },

        {
          path: path.home, //auth user
          element: (
            <MainLayout>
              <Home />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.home,
          element: (
            <MainLayout>
              <Suspense fallback={<div>loading</div>}>
                <Home />
              </Suspense>
            </MainLayout>
          ),
          index: true
        },
        {
          path: path.registerAsTutor, //student
          element: (
            <MainLayout>
              <RegisterAsTuTor />
            </MainLayout>
          )
        },
        {
          path: path.user, //user-----------------------------------------------------------------------------------
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            { index: true, element: <Profile /> },
            { path: path.changePassword, element: <ChangPassword /> },
            { path: path.profileTT, element: <ProfileTT /> }
          ]
        },
        {
          path: path.createService, //tutor and student-------------------------------------------------------------------------
          element: (
            <MainLayout>
              <CreateService />
            </MainLayout>
          )
        },
        {
          path: path.requestList, //tutor and student-------------------------------------------------------------------------
          element: (
            <MainLayout>
              <RequestList />
            </MainLayout>
          )
        },
        {
          path: path.tutors, //student
          element: (
            <MainLayout>
              <TutorList />
            </MainLayout>
          )
        },
        {
          path: path.support, //student
          element: (
            <MainLayout>
              <Support />
            </MainLayout>
          )
        },
        {
          path: path.checkOut, //student
          element: (
            <MainLayout>
              <CheckOut />
            </MainLayout>
          )
        },
        {
          path: path.deposit,
          element: (
            <MainLayout>
              <Deposit />
            </MainLayout>
          )
        },

        {
          path: '/tutors/:idReq', //student--------------------------------------------------------------------------
          element: (
            <MainLayout>
              <TutorList />
            </MainLayout>
          )
        },
        {
          path: path.requestStudentCurrent, //student
          element: (
            <MainLayout>
              <ReStuCurrentPage />
            </MainLayout>
          )
        },
        {
          path: path.checkOut, // student
          element: (
            <MainLayout>
              <CheckOut />
            </MainLayout>
          )
        },
        {
          path: path.paymentcallback, // student // này là hiển thị thông báo nạp tiền thành công nha fen
          element: (
            <MainLayout>
              <PaymentCallback />
            </MainLayout>
          )
        },
        {
          path: path.paymentSucsess, // student // này là hiển thị thông báo nạp tiền thành công nha fen
          element: (
            <MainLayout>
              <PaymentSuccess />
            </MainLayout>
          )
        },
        {
          path: path.paymentFail, // student // này là hiển thị thông báo nạp tiền thành công nha fen
          element: (
            <MainLayout>
              <PaymentFail />
            </MainLayout>
          )
        },
        {
          path: path.studentViewRequestList, //student
          element: (
            <MainLayout>
              <ReStuPending />
            </MainLayout>
          )
        },
        {
          path: path.tutorViewRequestList, //student
          element: (
            <MainLayout>
              <ReStuPending />
            </MainLayout>
          )
        },
        {
          path: path.myClass, //student
          element: (
            <MainLayout>
              <MyClass />
            </MainLayout>
          )
        },
        {
          path: path.Moderator.mod, //mod-------------------------------------------------------------------------------
          element: <ModeratorLayout />,
          children: [
            { index: true, element: <StudentRes /> },
            {
              path: path.Moderator.tutorResRegis,
              element: <ModTutorResRegis />
            },
            {
              path: path.Moderator.listAccountStudent,
              element: <ModAccountStudent />
            }
          ]
        },
        {
          path: path.Admin.admin, //admin--------------------------------------------------------
          element: <AdminLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />
            },
            { path: path.Admin.sessionList, element: <SessionList /> },
            { path: path.Admin.studentlist, element: <StudentList /> },
            { path: path.Admin.adminStudentReq, element: <AdminStudentReq /> },
            { path: path.Admin.TransactionList, element: <TransactionList /> },
            {
              path: path.Admin.adminStudentReqApproved,
              element: <AdminStudentReqApproved />
            },
            {
              path: path.Admin.adminStudentReqRejected,
              element: <AdminStudentReqRejected />
            },
            { path: path.Admin.tutorList, element: <AdminListTutor /> },
            {
              path: path.Admin.confirmProfileRegisterTT,
              element: <AdminConfirmRegister />
            },
            {
              path: path.Admin.rejectProfileRegisterTT,
              element: <AdminRejectRegister />
            }
          ]
        },

        {
          path: path.deposit,
          element: (
            <MainLayout>
              <Deposit />
            </MainLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}

// import { Navigate, Outlet, useRoutes } from 'react-router-dom'
// import { useContext } from 'react'
// import { AppContext } from './context/app.context'
// import { path } from './constant/path'
// import MainLayout from './layout/MainLayout'
// import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
// import AdminLayout from './pages/Admin/AdminLayout'
// import ModeratorLayout from './pages/Moderator/ModeratorLayout/ModeratorLayout'
// import UserLayout from './pages/User/layout/UserLayout'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import RequestList from './pages/RequestList'
// import TutorList from './pages/TutorList'
// import Calendar from './pages/Calendar'
// import CheckOut from './pages/CheckOut'
// import ChangePassword from './pages/User/pages/ChangePassword'
// import Profile, { default as ProfileTT } from './pages/User/pages/Profile'
// import SessionList from './pages/Admin/Components/SessionList'
// import StudentList from './pages/Admin/Components/StudentList'
// import AdminListTutor from './pages/Admin/Components/AdminListTutor'
// import AdminConfirmRegister from './pages/Admin/Components/AdminConfirmRegister/AdminConfirmRegister'
// import AdminRejectRegister from './pages/Admin/Components/AdminRejectRegister'
// import StudentRes from './pages/Moderator/Components/StudentRes'
// import ModTutorResRegis from './pages/Moderator/Components/ModTutorResRegis/ModTutorResRegis'
// import ReStuPending from './pages/StudentViewRequestList/Layout/ReStuPending'
// import ReStuCurrentPage from './pages/StudentViewRequestList/Layout/ReStuCurrentPage'

// function ProtectedRoute({ roles }) {
//   const { isAuthenticated, profile } = useContext(AppContext)
//   if (!isAuthenticated) {
//     return <Navigate to={path.login} />
//   }
//   if (roles && !roles.includes(profile.role)) {
//     return <Navigate to={path.home} />
//   }
//   return <Outlet />
// }

// function RejectedRoute() {
//   const { isAuthenticated } = useContext(AppContext)
//   return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
// }

// export default function useRouteElements() {
//   const routeElements = useRoutes([
//     {
//       path: '',
//       element: <RejectedRoute />,
//       children: [
//         {
//           path: path.register,
//           element: (
//             <RegisterLayout>
//               <Register />
//             </RegisterLayout>
//           )
//         },
//         {
//           path: path.login,
//           element: (
//             <RegisterLayout>
//               <Login />
//             </RegisterLayout>
//           )
//         },
//         {
//           path: path.home,
//           element: (
//             <MainLayout>
//               <Home />
//             </MainLayout>
//           )
//         }
//       ]
//     },
//     {
//       path: '',
//       element: <ProtectedRoute />,
//       children: [
//         {
//           path: path.home,
//           element: (
//             <MainLayout>
//               <Home />
//             </MainLayout>
//           ),
//           index: true
//         },
//         {
//           path: path.hocSinh,
//           element: (
//             <ProtectedRoute roles={['Học sinh']}>
//               <MainLayout>
//                 <UserLayout />
//               </MainLayout>
//             </ProtectedRoute>
//           ),
//           children: [
//             { index: true, element: <Profile /> },
//             { path: path.changePassword, element: <ChangePassword /> }
//           ]
//         },
//         {
//           path: path.requestList,
//           element: (
//             <ProtectedRoute roles={['Gia sư', 'Học sinh']}>
//               <MainLayout>
//                 <RequestList />
//               </MainLayout>
//             </ProtectedRoute>
//           )
//         },
//         {
//           path: path.tutors,
//           element: (
//             <ProtectedRoute roles={['Học sinh']}>
//               <MainLayout>
//                 <TutorList />
//               </MainLayout>
//             </ProtectedRoute>
//           )
//         },
//         {
//           path: path.checkOut,
//           element: (
//             <ProtectedRoute roles={['Học sinh']}>
//               <MainLayout>
//                 <CheckOut />
//               </MainLayout>
//             </ProtectedRoute>
//           )
//         },
//         {
//           path: path.profileTT,
//           element: (
//             <ProtectedRoute roles={['Gia sư']}>
//               <MainLayout>
//                 <ProfileTT />
//               </MainLayout>
//             </ProtectedRoute>
//           )
//         },
//         {
//           path: path.requestStudentCurrent,
//           element: (
//             <ProtectedRoute roles={['Học sinh']}>
//               <MainLayout>
//                 <ReStuCurrentPage />
//               </MainLayout>
//             </ProtectedRoute>
//           )
//         },
//         {
//           path: path.studentViewRequestList,
//           element: (
//             <ProtectedRoute roles={['Học sinh']}>
//               <MainLayout>
//                 <ReStuPending />
//               </MainLayout>
//             </ProtectedRoute>
//           )
//         },
//         {
//           path: path.Moderator.mod,
//           element: (
//             <ProtectedRoute roles={['Điều hành viên']}>
//               <ModeratorLayout />
//             </ProtectedRoute>
//           ),
//           children: [
//             { index: true, element: <StudentRes /> },
//             {
//               path: path.Moderator.tutorResRegis,
//               element: <ModTutorResRegis />
//             }
//           ]
//         },
//         {
//           path: path.Admin.admin,
//           element: (
//             <ProtectedRoute roles={['Quản trị viên']}>
//               <AdminLayout />
//             </ProtectedRoute>
//           ),
//           children: [
//             { path: path.Admin.sessionList, element: <SessionList /> },
//             { path: path.Admin.studentlist, element: <StudentList /> },
//             { path: path.Admin.tutorList, element: <AdminListTutor /> },
//             {
//               path: path.Admin.confirmProfileRegisterTT,
//               element: <AdminConfirmRegister />
//             },
//             {
//               path: path.Admin.rejectProfileRegisterTT,
//               element: <AdminRejectRegister />
//             }
//           ]
//         }
//       ]
//     }
//   ])

//   return routeElements
// }
