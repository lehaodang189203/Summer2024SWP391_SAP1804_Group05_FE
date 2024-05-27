import { createBrowserRouter, useRoutes } from 'react-router-dom'
import TutorList from './pages/TutorList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
import Home from './pages/Home'
import path from './constant/path'
import RegisterAsTutor from './pages/RegisterAsTutor/RegisterAsTutor'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.tutorList,
      index: true,
      element: (
        <RegisterLayout>
          <TutorList />
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
        <RegisterLayout>
          <RegisterAsTutor />
        </RegisterLayout>
      )
    },
    {
      path: path.home,
      element: (
        <RegisterLayout>
          <Home />
        </RegisterLayout>
      )
    }
  ])

  return routeElements
}
