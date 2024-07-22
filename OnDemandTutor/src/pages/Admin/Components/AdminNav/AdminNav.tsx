import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BUMBUM from '../../../../assets/img/aaaaaa.jpg'
import { path } from '../../../../constant/path'
import { getProfileFromLS } from '../../../../utils/auth'
import { AppContext } from '../../../../context/app.context'
import { useMutation } from '@tanstack/react-query'
import { LogoutReqBody } from '../../../../types/user.request.type'
import { authApi } from '../../../../api/auth.api'
export default function AdminNav() {
  const option = ['DashBar', 'StudentList', 'TutorList', 'SessionList']
  const [active, setAtive] = useState('')
  const handleSetActive = (data: string) => {
    setAtive(data)
  }

  const navigate = useNavigate()

  const {
    isAuthenticated,
    setIsAuthenticated,
    refreshToken,
    profile,
    setProfile
  } = useContext(AppContext)

  const user = getProfileFromLS()
  console.log('user', user)

  const logoutMutation = useMutation({
    mutationFn: (body: LogoutReqBody) => authApi.logoutAccount(body)
  })

  const handleLogout = () => {
    console.log(222)

    logoutMutation.mutate(
      { refresh_token: refreshToken },
      {
        onSuccess: () => {
          setProfile(null)

          navigate(path.login)
          setIsAuthenticated(false)
        }
      }
    )
  }

  return (
    <div className='fixed top-0 left-0 h-full p-2 grid grid-flow-row grid-rows-12 bg-white shadow-lg w-1/6 rounded-lg'>
      <Link to={path.home} className='row-span-2 mb-5'>
        <div>
          <img src={BUMBUM} alt='logo ' />
        </div>
      </Link>
      <div className='row-span-3 m-5'>
        <div className='border border-black inline p-2 rounded-md cursor-pointer'>
          Trang quản trị
        </div>
      </div>
      <div className='row-span-6'>
        <Link to={path.Admin.admin}>
          <button
            className='text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md'
            onClick={() => handleSetActive('DashBar')}
          >
            Quản lí Doanh thu
          </button>
        </Link>
        <Link to={path.Admin.studentlist}>
          <button
            className='text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md'
            onClick={() => handleSetActive('StudentList')}
          >
            Danh sách học sinh
          </button>
        </Link>
        <Link to={path.Admin.tutorList}>
          <button
            className='text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md'
            onClick={() => handleSetActive('TutorList')}
          >
            Danh sách giảng viên
          </button>
        </Link>
        <Link to={path.Admin.TransactionList}>
          <button
            className='text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md'
            onClick={() => handleSetActive('SessionList')}
          >
            Danh sách giao dịch
          </button>
        </Link>

        <Link to={path.Admin.listComplant}>
          <button
            className='text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md'
            onClick={() => handleSetActive('viewAllComplaint')}
          >
            Danh sách đánh giá
          </button>
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className='block py-3 border-2 text-center px-4 hover:bg-pink-300 bg-pink-400   hover:text-white w-full rounded-lg my-auto'
      >
        Đăng xuất
      </button>
    </div>
  )
}
