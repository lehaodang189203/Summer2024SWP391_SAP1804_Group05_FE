import { Link } from 'react-router-dom'
import BUMBUM from '../../assets/img/BUMBUM.png'
import Popover from '../Popover/Popover'
export default function Header() {
  return (
    <header className='top-0 h-[8rem] bg-white shadow-md z-50 '>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-12 gap-4 items-end '>
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
          <div className='h-36 col-span-6 text-2xl'>
            <div className='pr-[50px] pt-[40px] justify-around items-center flex'>
              <Link to='/' className='ct-top-menu-items'>
                Trang chủ
              </Link>

              <Popover
                className='flex items-center py-1 hover:text-black cursor-pointer'
                renderPopover={
                  <div className='bg-transparent relative shadow-md rounded-2xl   text-white'>
                    <div className='text-white  w-full flex py-2  items-center justify-between text-center  text-[10px]   bg-black  px-auto rounded-2xl'>
                      <Link
                        to='/registerAT'
                        className='py-2 w-[10rem]  hover:text-pink-400'
                      >
                        Đăng ký trở thành giảng viên
                      </Link>
                      <Link
                        to='/tutorList'
                        className='py-2 w-[10rem]   hover:text-pink-400'
                      >
                        danh sách lớp
                      </Link>
                    </div>
                  </div>
                }
              >
                <div className='ct-top-menu-items'>Loại dịch vụ</div>
              </Popover>

              <Link to='/' className='ct-top-menu-items'>
                Hỗ trợ
              </Link>
            </div>
          </div>
          {/* Login */}

          <nav className='h-36 pt-[48px] col-span-3'>
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
          </nav>
        </div>
      </div>
    </header>
  )
}
