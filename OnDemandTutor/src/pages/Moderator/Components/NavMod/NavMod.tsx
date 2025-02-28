import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import BUMBUM from '../../../../assets/img/moi2.jpg'
import { path } from '../../../../constant/path'
import { getProfileFromLS } from '../../../../utils/auth'
import { User } from '../../../../types/user.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogoutReqBody } from '../../../../types/user.request.type'
import { authApi } from '../../../../api/auth.api'
import { AppContext } from '../../../../context/app.context'
const user: User = getProfileFromLS()
export default function NavMod() {
  const option = ['DashBar', 'StudentList', 'TutorList', 'SessionList']
  const [active, setAtive] = useState('')
  const handleSetActive = (data: string) => {
    setAtive(data)
  }
  const queryClient = useQueryClient()

  const {
    isAuthenticated,
    setIsAuthenticated,
    refreshToken,
    profile,
    setProfile
  } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: (body: LogoutReqBody) => authApi.logoutAccount(body)
  })

  const handleLogout = () => {
    logoutMutation.mutate(
      { refresh_token: refreshToken },
      {
        onSuccess: () => {
          setProfile(null)
          queryClient.removeQueries({ queryKey: ['Request'] })
          setIsAuthenticated(false)
        }
      }
    )
  }
  return (
    <div className=' h-full p-2 grid grid-flow-row grid-rows-12'>
      <Link to={path.home}>
        <div className='row-span-1 m-5'>
          <img src={BUMBUM} alt='logo' />
        </div>
      </Link>
      <div className='row-span-2 my-10 pt-10'>
        <div className='border shadow-lg inline p-2 rounded-md cursor-pointer'>
          Trang Điều Hành Viên
        </div>
      </div>
      <div className='row-span-7 my-5'>
        <Link to={path.Moderator.mod}>
          <button
            className='text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md'
            onClick={() => handleSetActive('student')}
          >
            Kiểm duyệt đơn tạo lớp
          </button>
        </Link>
        <Link to={path.Moderator.tutorResRegis}>
          <button
            className='text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md'
            onClick={() => handleSetActive('tutor')}
          >
            Kiểm duyệt đơn trở thành gia sư
          </button>
        </Link>

        <Link to={path.Moderator.listComplant}>
          <button
            className='text-xs mr-7 mb-4 ml-7 w-5/6 p-3 border border-black bg-white content-center justify-center hover:bg-pink-300 rounded-md'
            onClick={() => handleSetActive('tutor')}
          >
            Kiểm duyệt Đánh giá
          </button>
        </Link>
      </div>
      <div className='row-span-3'>
        <button
          onClick={handleLogout}
          className='block py-3 border-2 text-center my-2 px-4 hover:bg-pink-300 bg-pink-400   hover:text-white w-full rounded-lg  '
        >
          Đăng xuất
        </button>
      </div>
    </div>
  )
}
