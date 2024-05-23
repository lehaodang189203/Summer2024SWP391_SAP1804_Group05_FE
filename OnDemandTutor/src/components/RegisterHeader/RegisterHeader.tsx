import { Link } from 'react-router-dom'
import BUMBUM from '../../assets/img/BUMBUM.png'

export default function RegisterHeader() {
  return (
    <header className='sticky top-0 h-[8rem] bg-white shadow-md z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-12 gap-4 items-end'>
          {/* Logo */}
          <nav className='h-50 flex items-start col-span-3 pr-20'>
            <Link to='/'>
              <div className='w-32 pt-[100%] mt-2 relative'>
                <div className='absolute top-0 left-0 w-[250px] h-full object-cover'>
                  <img src={BUMBUM} alt='logo' />
                </div>
              </div>
            </Link>
          </nav>
          {/* Mid */}
          <div className='h-36 col-span-7 text-2xl'>
            <div className='pr-[50px] pt-[40px] justify-around items-center flex'>
              <Link to='/' className='text-center hover:text-pink-600'>
                Trang chủ
              </Link>

              <Link to='/' className='text-center hover:text-pink-600'>
                Loại dịch vụ
              </Link>

              <Link to='/' className='text-center hover:text-pink-600'>
                Hỗ trợ
              </Link>
            </div>
          </div>
          {/* Login */}
          <nav className='h-36 pt-[48px] col-span-2'>
            <Link to='/login' className='border-black border-2 px-2 py-2 rounded-lg hover:bg-gray-200'>
              Đăng Nhập
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
