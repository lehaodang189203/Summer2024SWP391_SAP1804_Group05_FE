import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import MainLayout from './layout/MainLayout'
// import DashBoard from './pages/DashBoard'
import { useContext } from 'react'
import { AppContext } from './context/app.context'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminConfirmRegister from './pages/Admin/Components/AdminConfirmRegister/AdminConfirmRegister'
import AdminListTutor from './pages/Admin/Components/AdminListTutor'
import AdminRejectRegister from './pages/Admin/Components/AdminRejectRegister'
import SessionList from './pages/Admin/Components/SessionList'
import StudentList from './pages/Admin/Components/StudentList'
import Calendar from './pages/Calendar'
import CheckOut from './pages/CheckOut'
import Deposit from './pages/Deposit'
import ModeratorLayout from './pages/Moderator/ModeratorLayout/ModeratorLayout'
import StudentRes from './pages/Moderator/Components/StudentRes'
import RegisterAsTutor from './pages/RegisterAsTutor'
import RequestList from './pages/RequestList'
import TutorList from './pages/TutorList'
import UserLayout from './pages/User/layout/UserLayout'
import ChangPassword from './pages/User/pages/ChangePassword'
import {
  default as Profile,
  default as ProfileTT
} from './pages/User/pages/Profile'

import { path } from './constant/path'

import StudentViewRequestListLOut from './pages/StudentViewRequestList/Layout/StudentViewRequestListLOut'
import RequestStudentCurrent from './pages/StudentViewRequestList/RequestStudentCurrent/RequestStudentCurrent'
import { RequestStudentPending } from './pages/StudentViewRequestList/RequestStudentPending/RequestStudentPending'
import ModTutorResRegis from './pages/Moderator/Components/ModTutorResRegis/ModTutorResRegis'

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
      path: path.Moderator.mod,
      element: <ModeratorLayout />,
      children: [
        {
          index: true,
          element: <StudentRes />
        },
        {
          path: path.Moderator.tutorResRegis,
          element: <ModTutorResRegis />
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
    },
    {
      // trang học sinh kiểm tra đơn của mình
      path: path.studentViewRequestList,
      element: (
        <MainLayout>
          <StudentViewRequestListLOut />
        </MainLayout>
      ),
      children: [
        {
          index: true,
          element: <RequestStudentPending />
        },
        {
          path: path.RequestStudentCurrent,
          element: <RequestStudentCurrent />
        }
      ]
    }
  ])
  return routeElements
}
