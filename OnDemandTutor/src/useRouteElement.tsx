import { createBrowserRouter, useRoutes } from 'react-router-dom'
import TutorList from './pages/TutorList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layout/RegisterLayout/RegisterLayout'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <TutorList />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',

      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])

  return routeElements
}
