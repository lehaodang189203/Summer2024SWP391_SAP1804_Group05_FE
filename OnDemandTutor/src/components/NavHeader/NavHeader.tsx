import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import { authApi } from '../../api/auth.api'
import me from '../../assets/img/me.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Popover from '../Popover/Popover'
import path from '../../constant/path'
import { toast } from 'react-toastify'
// import { getRefreshTokenFromLS } from '../../utils/auth'
import { LogoutReqBody } from '../../types/user.request.type'

export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, refreshToken } =
    useContext(AppContext)

  const navigate = useNavigate()

  const refresh = refreshToken

  const logoutMutation = useMutation({
    mutationFn: (body: LogoutReqBody) => authApi.logoutAccount(body)
  })

  const handleLogout = () => {
    logoutMutation.mutate(
      { refreshToken: refresh },
      {
        onSuccess: (refreshToken) => {
          navigate(path.login)

          setIsAuthenticated(false)
        }
      }
    )
  }

  return (
    <div className='container'>
      <div className='flex justify-end'>
        <Popover
          as='span'
          className='flex items-center py-1 hover:text-white/70 cursor-pointer'
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
        </Popover>

        {isAuthenticated && (
          <Popover
              className='flex items-center py-1 hover:text-white/70 cursor-pointer ml-6'
            renderPopover={
              <div className='shadow-md rounded-sm border border-gray-200'>
                <Link
                  to={path.profile}
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
                  to='/'
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Nạp tiền
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
                src={me}
                alt='avatar'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <Link to={'/profile'}><div className='text-black hover:text-pink-400'>
            thanhngo.3544@gmail.com
          </div></Link>
          </Popover>
        )}

        {!isAuthenticated && (
          <div className='flex items-center'>
            <Link
              to={path.register}
              className='mx-3 capitalize hover:text-white/70'
            >
              Đăng ký
            </Link>
            <div className='border-r-[1px] border-r-white/40 h-4' />
            <Link
              to={path.login}
              className='mx-3 capitalize hover:text-white/70'
            >
              Đăng Nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
