import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/auth.api'

// import { getRefreshTokeNFromLS } from '../../utils/auth'
import userImage from '../../assets/img/user.svg'
import { path } from '../../constant/path'
import { roles } from '../../constant/roles'
import { AppContext } from '../../context/app.context'
import { User } from '../../types/user.type'
import { clearLS, getProfileFromLS } from '../../utils/auth'
import Popover from '../Popover/Popover'

const user: User = getProfileFromLS() // tạo user để in ra số dư trên header
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

  const logoutMutation = useMutation({
    mutationFn: (body: any) => authApi.logoutAccount(body)
  })

  const handleLogout = () => {
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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }
  return (
    <div className='container'>
      <div className='flex justify-end gap-5'>
        {isAuthenticated && (
          <div className='border-2 px-auto py-auto mt-2 mr-10 rounded-md justify-center items-center flex  font-medium  '>
            <Link to={path.deposit} className=' '>
              <span>Số dư:</span>{' '}
              {formatCurrency(
                profile?.accountBalance ? profile.accountBalance : 0
              )}
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <Popover
            className='flex my-2 items-center hover:text-pink-400 cursor-pointer '
            renderPopover={
              <div className='shadow-md mt-2 rounded-sm border border-gray-200'>
                <Link
                  to={path.user}
                  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                >
                  Tài khoản của tôi
                </Link>

                {user?.roles === roles.moderator ||
                  (user?.roles === roles.admin && (
                    <Link
                      to={path.deposit}
                      className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                    >
                      Nạp tiền
                    </Link>
                  ))}

                {user?.roles === roles.moderator && (
                  <Link
                    to={path.Moderator.mod}
                    className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    Kiểu duyệt
                  </Link>
                )}
                {(user?.roles === roles.student ||
                  user?.roles === roles.tutor) && (
                  <div>
                    <Link
                      to={path.deposit}
                      className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                    >
                      Nạp tiền
                    </Link>
                    <Link
                      to={path.studentViewRequestList}
                      className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                    >
                      Xem đơn của bạn (Học Sinh)
                    </Link>
                    <Link
                      to={path.tutorViewRequestList}
                      className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                    >
                      Xem đơn của bạn (Tutor)
                    </Link>
                  </div>
                )}

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
