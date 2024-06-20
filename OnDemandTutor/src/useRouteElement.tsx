import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './context/app.context'
import { path } from './constant/path'
import MainLayout from './layout/MainLayout'
import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
import AdminLayout from './pages/Admin/AdminLayout'
import ModeratorLayout from './pages/Moderator/ModeratorLayout/ModeratorLayout'
import UserLayout from './pages/User/layout/UserLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import RequestList from './pages/RequestList'
import TutorList from './pages/TutorList'
import Calendar from './pages/Calendar'
import CheckOut from './pages/CheckOut'
// import Deposit from './pages/Deposit'
import ChangPassword from './pages/User/pages/ChangePassword'
import Profile, { default as ProfileTT } from './pages/User/pages/Profile'
import SessionList from './pages/Admin/Components/SessionList'
import StudentList from './pages/Admin/Components/StudentList'
import AdminListTutor from './pages/Admin/Components/AdminListTutor'
import AdminConfirmRegister from './pages/Admin/Components/AdminConfirmRegister/AdminConfirmRegister'
import AdminRejectRegister from './pages/Admin/Components/AdminRejectRegister'
import StudentRes from './pages/Moderator/Components/StudentRes'
import ModTutorResRegis from './pages/Moderator/Components/ModTutorResRegis/ModTutorResRegis'
import ReStuPending from './pages/StudentViewRequestList/Layout/ReStuPending'
import ReStuCurrentPage from './pages/StudentViewRequestList/Layout/ReStuCurrentPage'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
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
          path: path.register,// user
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        },
        {
          path: path.login,// user
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.home,//auth user
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
              <Home />
            </MainLayout>
          ),
          index: true
        },
        // {
        //   path: path.registerAsTutor,
        //   element: (
        //     <MainLayout>
        //       <RegisterAsTutor />
        //     </MainLayout>
        //   )
        // },
        {
          path: path.user,//user-----------------------------------------------------------------------------------
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            { index: true, element: <Profile /> },
            { path: path.changePassword, element: <ChangPassword /> }
          ]
        },
        {
          path: path.requestList,//tutor and student-------------------------------------------------------------------------
          element: (
            <MainLayout>
              <RequestList />
            </MainLayout>
          )
        },
        {
          path: path.profileTT,//tutor
          element: (
            <MainLayout>
              <ProfileTT />
            </MainLayout>
          )
        },
        {
          path: path.tutors,//student--------------------------------------------------------------------------
          element: (
            <MainLayout>
              <TutorList />
            </MainLayout>
          )
        },
        {
          path: path.requestStudentCurrent,//student
          element: (
            <MainLayout>
              <ReStuCurrentPage />
            </MainLayout>
          )
        },
        {
          path: path.checkOut,// student
          element: (
            <MainLayout>
              <CheckOut />
            </MainLayout>
          )
        }
        ,
        {
          path: path.studentViewRequestList,//student
          element: (
            <MainLayout>
              <ReStuPending />
            </MainLayout>
          )
        }
        ,
        {
          path: path.Moderator.mod, //mod-------------------------------------------------------------------------------
          element: <ModeratorLayout />,
          children: [
            { index: true, element: <StudentRes /> },
            {
              path: path.Moderator.tutorResRegis,
              element: <ModTutorResRegis />
            }
          ]
        },
        {
          path: path.Admin.admin,//admin--------------------------------------------------------
          element: <AdminLayout />,
          children: [
            { path: path.Admin.sessionList, element: <SessionList /> },
            { path: path.Admin.studentlist, element: <StudentList /> },
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
          path: path.calender,//dell bk
          element: (
            <MainLayout>
              <Calendar />
            </MainLayout>
          )
        }
        // {
        //   path: path.deposit,
        //   element: (
        //     <MainLayout>
        //       <Deposit />
        //     </MainLayout>
        //   )
        // },
        
        
        
        
        
      ]
    }
  ])

  return routeElements
}
