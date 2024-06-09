import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import TutorList from './pages/TutorList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
import Home from './pages/Home'
import path from './constant/path'

import MainLayout from './layout/MainLayout'

// import RegisterAsTutor from './pages/RegisterAsTutor/RegisterAsTutor'
import DashBoard from './pages/DashBoard'
import { AppContext } from './context/app.context'
import { useContext } from 'react'
import RegisterAsTutor from './pages/RegisterAsTutor'
import RequestList from './pages/RequestList'
import ProfileTT from './pages/ProfileTT'
import CheckOut from './pages/CheckOut'

export default function useRouteElements() {
  function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    //  nếu có token thì khỏi phải login
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  function RejectedRoute() {
    //  hàm này dùng cho là khi đã login rồi thì không cho login| regis nưa
    const { isAuthenticated } = useContext(AppContext)

    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }
  //
  const routeElements = useRoutes([
    // {
    //   path: '',
    //   element: <RejectedRoute />,
    //   // kiểu như mún vào con thì phải đi qua cha
    //   children: [
    //     {
    //       path: path.login,
    //       element: (
    //         <RegisterLayout>
    //           <Login />
    //         </RegisterLayout>
    //       )
    //     },
    //     {
    //       path: path.register,
    //       element: (
    //         <RegisterLayout>
    //           <Register />
    //         </RegisterLayout>
    //       )
    //     }
    //   ]
    // },
    {
      path: path.tutorList,
      index: true,
      element: (
        <MainLayout>
          <TutorList />
        </MainLayout>
      )
    },
    {
      path: path.requestList,
      index: true,
      element: (
        <MainLayout>
          <RequestList />
        </MainLayout>
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
      path: path.register,

      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: path.registerAsTutor,
      element: (
        <MainLayout>
          <RegisterAsTutor />
        </MainLayout>
      )
    },
    {
      path: path.home,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: path.dashBoard,
      element: (
        <RegisterLayout>
          <DashBoard />
        </RegisterLayout>
      )
    },
    {
      path: path.profileTT,
      element: (
        <MainLayout>
          <ProfileTT/>
        </MainLayout>
      )
    },
    {
      path: path.checkOut,
      element: (
        <MainLayout>
          <CheckOut/>
        </MainLayout>
      )
    }
  ])

  return routeElements
}
// import { Navigate, Outlet, useRoutes } from 'react-router-dom'
// import TutorList from './pages/TutorList'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
// import Home from './pages/Home'
// import path from './constant/path'

// import MainLayout from './layout/MainLayout'

// import RegisterAsTutor from './pages/RegisterAsTutor/RegisterAsTutor'
// import DashBoard from './pages/DashBoard'
// import { useContext } from 'react'
// import { AppContext } from './context/app.context'

// export default function useRouteElements() {
//   function ProtectedRoute() {
//     const { isAuthenticated } = useContext(AppContext)
//     //  nếu có token thì khỏi phải login
//     return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
//   }

//   function RejectedRoute() {
//     //  hàm này dùng cho là khi đã login rồi thì không cho login| regis nưa
//     const { isAuthenticated } = useContext(AppContext)

//     return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
//   }
//   //
//   const routeElements = useRoutes([
//     {
//       path: path.tutorList,
//       index: true,
//       element: (
//         <MainLayout>
//           <TutorList />
//         </MainLayout>
//       )
//     },
//     {
//       path: '',
//       element: <RejectedRoute />,
//       // kiểu như mún vào con thì phải đi qua cha
//       children: [
//         {
//           path: path.login,
//           element: (
//             <RegisterLayout>
//               <Login />
//             </RegisterLayout>
//           )
//         },
//         {
//           path: path.register,
//           element: (
//             <RegisterLayout>
//               <Register />
//             </RegisterLayout>
//           )
//         },
//         {
//           path: path.registerAsTutor,
//           element: (
//             <MainLayout>
//               <RegisterAsTutor />
//             </MainLayout>
//           )
//         }
//       ]
//     },

//     {
//       path: path.home,
//       element: (
//         <MainLayout>
//           <Home />
//         </MainLayout>
//       )
//     },
//     {
//       path: path.dashBoard,
//       element: (
//         <RegisterLayout>
//           <DashBoard />
//         </RegisterLayout>
//       )
//     }
//   ])

//   return routeElements
// }
