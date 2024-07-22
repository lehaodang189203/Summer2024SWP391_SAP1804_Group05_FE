import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../../../../context/app.context'
import MainLayout from '../../../../layout/MainLayout'
import Home from '../../../Home'
import RegisterLayout from '../../../../layout/RegisterLayout/RegisterLayout'

export default function HomeRoute() {
  const { isAuthenticated } = useContext(AppContext)

  if (isAuthenticated) {
    return (
      <MainLayout>
        <Home />
        <Outlet />
      </MainLayout>
    )
  } else {
    return (
      <RegisterLayout>
        <Home />
        <Outlet />
      </RegisterLayout>
    )
  }
}
