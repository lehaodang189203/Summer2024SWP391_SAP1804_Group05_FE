import { createBrowserRouter, useRoutes } from 'react-router-dom'
import TutorList from './pages/TutorList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
import Home from './pages/Home'
import path from './constant/path'

export default function useRouteElements() {
  const routeElements = useRoutes([
    // {
    //   path: path.home,
    //   index: true,
    //   element: (
    //     <RegisterLayout>
    //       <Home />
    //     </RegisterLayout>
    //   )
    // },
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
      path: path.tutorList,
      element: (
        <RegisterLayout>
          <Home />
        </RegisterLayout>
      )
    }
  ])

  return routeElements
}
