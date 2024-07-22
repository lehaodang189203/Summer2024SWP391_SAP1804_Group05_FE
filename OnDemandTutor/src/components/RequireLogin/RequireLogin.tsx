import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { path } from '../../constant/path'

export default function RequireLoginNotification() {
  const [isVisible, setIsVisible] = useState(true)
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(path.login)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className='fixed top-4 right-4 w-80 p-4 bg-blue-100 border border-blue-300 rounded-md shadow-lg'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <h2 className='text-lg font-semibold text-blue-800'>
            Yêu cầu đăng nhập
          </h2>
          <p className='text-blue-700 mt-1'>
            Để sử dụng các chức năng này, bạn cần đăng nhập vào hệ thống.
          </p>
        </div>
        <button
          className='ml-4 text-blue-500 hover:text-blue-700'
          onClick={handleClose}
          aria-label='Đóng thông báo'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
      <button
        className='mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        onClick={handleNavigate}
      >
        Đăng nhập
      </button>
    </div>
  )
}
