import { useRoutes } from 'react-router-dom'
import TutorList from './pages/TutorList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layout/RegisterLayout/RegisterLayout'
import Home from './pages/Home'
import path from './constant/path'
<<<<<<< HEAD
import MainLayout from './layout/MainLayout'
=======
import RegisterAsTutor from './pages/RegisterAsTutor/RegisterAsTutor'
>>>>>>> bfeaa5e73ebe225fbc64edebe7ee2de763e79d74

export default function useRouteElements() {
  //
  const routeElements = useRoutes([
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
        <MainLayout>
          <Home />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
