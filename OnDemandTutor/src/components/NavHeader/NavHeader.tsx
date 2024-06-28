import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.api'

// import { getRefreshTokeNFromLS } from '../../utils/auth'
import { BellOutlined } from '@ant-design/icons'
import { Badge } from 'antd'
import { path } from '../../constant/path'
import { AppContext } from '../../context/app.context'
import { LogoutReqBody } from '../../types/user.request.type'
import { clearLS, getProfileFromLS } from '../../utils/auth'
import { getAvatarUrl } from '../../utils/utils'
import Popover from '../Popover/Popover'
import userImage from '../../assets/img/user.svg'
import userApi from '../../api/user.api'
import { User } from '../../types/user.type'

const user:User = getProfileFromLS() // tạo user để in ra số dư trên header
export default function NavHeader() {
  //const [count, setCount] = useState(0) // State để quản lý số lượng thông báo
  // const receiveNotification = () => {
  //   //  hàm để nhận thông báo mới, vd sử dụng button onclick bằng hàm này
  //   setCount(count + 1)
  // }

  const {
    isAuthenticated,
    setIsAuthenticated,
    refreshToken,
    profile,
    setProfile
  } = useContext(AppContext)

  const navigate = useNavigate()


  const { data: ProfileData, refetch } = useQuery({
    queryKey: ['Account'],
    queryFn: userApi.getProfile
  })

  console.log(ProfileData)

   

  const refresh = refreshToken

  const logoutMutation = useMutation({
    mutationFn: (body: any) => authApi.logoutAccount(body)
  })

  const handleLogout = () => {
    console.log('refreshToken', refreshToken)

    logoutMutation.mutate(
      { refresh_token: refreshToken },
      {
        onSuccess: () => {
          navigate(path.login)
          clearLS()
          setProfile(null)
          setIsAuthenticated(false)
        }
      }
    )
  }




  return (
    <div className='container'>
      <div className='flex justify-end gap-5'>
        {/* <Popover
          as='span'
          className='flex items-center py-1 hover:text-pink-400 cursor-pointer'
          renderPopover={
            <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
              <div className='flex flex-col py-2 pr-28 pl-3'>
                <button className='button py-2 px-3 hover:text-orange'>
                  Tiếng Việt
                </button>
                <button className='button py-2 px-3 hover:text-orange mt-2'>
                  English
                </button>
              </div>
            </div>
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          
          <div className='mx-1'>Tiếng Việt</div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </Popover> */}

        {isAuthenticated && (
          <div className='flex justify-center text-center'>
            {user &&
              (user.roles === 'admin' || user.roles === 'Mod' ? (
                <div>
                  <Link
                    to={
                      user.roles === 'admin'
                        ? path.Admin.admin
                        : path.Moderator.mod
                    }
                  >
                    <button className='btn btn-primary shadow-md rounded-md p-3 hover:bg-pink-500'>
                      {user.roles === 'admin' ? 'Admin' : 'Mod'}
                    </button>
                  </Link>
                </div>
              ) : (
                <Link to={path.deposit}>
                <div className='flex gap-4 rounded-md shadow-lg p-3 pr-4 hover:bg-pink-300'>
                  <div>Số dư: </div>
                  {user.accountBalance !== null ? user.accountBalance    : 0}
                  <div>VNĐ</div>
                </div>
                </Link>
              ))}
          </div>
        )}
        {isAuthenticated && (
          <Popover
            className='flex items-center  hover:text-pink-400 cursor-pointer'
            renderPopover={
              <div className='shadow-md rounded-sm border border-gray-200'>
                <Link
                  to={path.user}
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to='/'
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Đơn Mua
                </Link>
                <Link
                  to='/deposit'
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Nạp tiền
                </Link>
                {profile?.roles === 'Dieu hanh vien' && (
                  <Link
                    to={path.Moderator.mod}
                    className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    thông báo
                  </Link>
                )}
                <Link
                  to={path.studentViewRequestList}
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Xem đơn của bạn(Học Sinh)
                </Link>
                <Link
                  to={path.home}
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Xem đơn của bạn(Tutor)
                </Link>
                <button
                  onClick={handleLogout}
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Đăng xuất
                </button>
              </div>
            }
          >
            <div className='w-5 h-5 mr-2 flex-shink-0'>
              <img
                src={profile?.avatar ? profile.avatar : userImage}
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <div className='text-black hover:text-pink-400'>
              {profile?.fullName}
            </div>
          </Popover>
        )}
        {!isAuthenticated && (
          <div className='flex items-center ml-[2rem]'>
            <Link
              to={path.login}
              className='transition duration-150 ease-in-out border-black border-2 px-2 py-2 rounded-lg hover:bg-gray-200 mr-1 '
            >
              Đăng Nhập
            </Link>
            <div className='border-r-[1px] border-r-white/40 h-4' />
            <Link
              to={path.register}
              className='bg-pink-500 border-black border-2 px-2 py-2 rounded-lg hover:bg-pink-400'
            >
              Đăng kí
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
