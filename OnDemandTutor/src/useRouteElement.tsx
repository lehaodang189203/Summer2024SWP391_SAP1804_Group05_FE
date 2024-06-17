import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
import Home from './pages/Home'

import MainLayout from './layout/MainLayout'
// import DashBoard from './pages/DashBoard'
import { AppContext } from './context/app.context'
import { useContext } from 'react'
import RegisterAsTutor from './pages/RegisterAsTutor'
import RequestList from './pages/RequestList'
import ProfileTT from './pages/User/pages/Profile'
import CheckOut from './pages/CheckOut'
import Calendar from './pages/Calendar'
import Deposit from './pages/Deposit'
import Profile from './pages/User/pages/Profile'
import UserLayout from './pages/User/layout/UserLayout'
import ChangPassword from './pages/User/pages/ChangePassword'
import TutorRegisterRequest from './pages/Moderator/Slide/TutorRegis'
import AdminLayout from './pages/Admin/AdminLayout'
import SessionList from './pages/Admin/Components/SessionList'
import StudentList from './pages/Admin/Components/StudentList'
import TutorList from './pages/TutorList'
import AdminListTutor from './pages/Admin/Components/AdminListTutor'
import AdminConfirmRegister from './pages/Admin/Components/AdminConfirmRegister/AdminConfirmRegister'
import AdminRejectRegister from './pages/Admin/Components/AdminRejectRegister'
import { path } from './constant/path'

export default function useRouteElements() {
  const { isAuthenticated } = useContext(AppContext)

  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
  }

  function RejectedRoute() {
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
  }

  const routeElements = useRoutes([
    // login register
    {
      path: path.register,
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: path.login,
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: path.home,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
      index: true
    },
    {
      path: path.registerAsTutor,
      element: (
        <MainLayout>
          <RegisterAsTutor />
        </MainLayout>
      )
    },

    //main session
    {
      path: path.requestList,
      element: (
        <MainLayout>
          <RequestList />
        </MainLayout>
      )
    },
    {
      path: path.tutors,
      element: (
        <MainLayout>
          <TutorList />
        </MainLayout>
      )
    },
    {
      path: path.calender,
      element: (
        <MainLayout>
          <Calendar />
        </MainLayout>
      )
    },
    {
      path: path.checkOut,
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
    //moder admin
    {
      path: path.profileTT,
      element: (
        <MainLayout>
          <ProfileTT />
        </MainLayout>
      )
    },
    //{path: path.Admin.dashBoard,element: (<><DashBoard /></>)},
    {
      path: path.Moderator.listReRegisterTT,
      element: (
        <MainLayout>
          <TutorRegisterRequest />
        </MainLayout>
      ),
      children: [
        {
          index: true,
          element: <TutorRegisterRequest />
        }
      ]
    },
    {
      path: path.Admin.admin,
      element: <AdminLayout />,
      children: [
        // {
        //   index: true,
        //   element: <DashBoard />
        // },
        {
          path: path.Admin.sessionList,
          element: <SessionList />
        },
        {
          path: path.Admin.studentlist,
          element: <StudentList />
        },
        {
          //tutor
          path: path.Admin.tutorList,
          element: <AdminListTutor />
        },
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
    //account
    {
      path: path.user,
      element: (
        <MainLayout>
          <UserLayout />
        </MainLayout>
      ),
      children: [
        {
          index: true,
          element: <Profile />
        },
        {
          path: path.changePassword,
          element: <ChangPassword />
        }
      ]
    }
  ])
  return routeElements
}

// {
//     path: '',
//     element: <RejectedRoute />,
//     children: [
//       {
//         path: path.login,
//         element: (
//           <RegisterLayout>
//             <Login />
//           </RegisterLayout>
//         )
//       },
//       {
//         path: path.register,
//         element: (
//           <RegisterLayout>
//             <Register />
//           </RegisterLayout>
//         )
//       },
//       {
//         path: path.home,
//         element: (
//           <RegisterLayout>
//             <Home />
//           </RegisterLayout>
//         ),
//         index: true
//       }
//     ]
//   },
//   {
//     path: '',
//     element: <ProtectedRoute />,
//     children: [
//       {
//         path: path.tutors,
//         element: (
//           <MainLayout>
//             <TutorList />
//           </MainLayout>
//         )
//       },
//       {
//         path: path.requestList,
//         element: (
//           <MainLayout>
//             <RequestList />
//           </MainLayout>
//         )
//       },
//       {
//         path: path.registerAsTutor,
//         element: (
//           <MainLayout>
//             <RegisterAsTutor />
//           </MainLayout>
//         )
//       },
//       {
//         path: path.home,
//         element: (
//           <MainLayout>
//             <Home />
//           </MainLayout>
//         ),
//         index: true
//       },
//       {
//         path: path.dashBoard,
//         element: (
//           <RegisterLayout>
//             <DashBoard />
//           </RegisterLayout>
//         )
//       },
//       {
//         path: path.profileTT,
//         element: (
//           <MainLayout>
//             <ProfileTT />
//           </MainLayout>
//         )
//       },
//       {
//         path: path.calender,
//         element: (
//           <MainLayout>
//             <Calendar />
//           </MainLayout>
//         )
//       },
//       {
//         path: path.checkOut,
//         element: (
//           <MainLayout>
//             <CheckOut />
//           </MainLayout>
//         )
//       },
//       {
//         path: path.user,
//         element: (
//           <MainLayout>
//             <UserLayout />
//           </MainLayout>
//         ),
//         children: [
//           {
//             index: true,
//             element: <Profile />
//           },
//           {
//             path: path.changePassword,
//             element: <ChangPassword />
//           }
//         ]
//       }
//     ]
//   }
// ])
