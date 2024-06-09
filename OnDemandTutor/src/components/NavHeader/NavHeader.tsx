import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import { authApi } from '../../api/auth.api'

import { Link } from 'react-router-dom'
import Popover from '../Popover/Popover'
import path from '../../constant/path'

export default function NavHeader() {
  // useQueryClinet này nó giông như là useContext vậy á
  //  nếu chúng ta dùng như này thì nó giống như là sử dụng queryCLient bên thằng main vậy á
  const queryClient = useQueryClient()
  const {
    // thằng này dùng để check nếu người người dùng chưa đăng nhập
    //  thì hiên đăng nhâp
    isAuthenticated,
    setIsAuthenticated
  } = useContext(AppContext)

  //  đây là những thuộc tính có sẵn ở trong useForm
  const logoutMutation = useMutation({
    mutationFn: authApi.logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='container flex'>
          {/*  qua trái */}
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
        {/*  trái đất */}
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

        {/*  mặc định mới vào là tiếng việt */}
        <div className='mx-1'>Tiếng Việt</div>
        {/*  mũi tên */}
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

    {
      isAuthenticated && (
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
                Lịch sử học tập
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
            {/*  avataer */}
            <img
              className='w-full h-full object-cover rounded-full'
              src='https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-luqbzvje8weqe3_tn'
            />
          </div>
          <div className='text-black hover:text-pink-400'>
            thanhngo.3544@gmail.com
          </div>
        </Popover>
      )
    }

    {
      !isAuthenticated && (
    <div className='flex items-center'>
      <Link
        to='/login'
        className='transition duration-150 ease-in-out border-black border-2 px-2 py-2 rounded-lg hover:bg-gray-200 mr-1 '
      >
        Đăng Nhập
      </Link>
      <Link
        to='/register'
        className='bg-pink-500 border-black border-2 px-2 py-2 rounded-lg hover:bg-pink-400'
      >
        Đăng kí
      </Link>
    </div>
      )
    }
    </div>
  )
}


