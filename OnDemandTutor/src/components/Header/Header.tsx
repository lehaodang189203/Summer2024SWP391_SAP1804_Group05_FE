import { Link } from 'react-router-dom'
import BUMBUM from '../../assets/img/BUMBUM.png'
import Popover from '../Popover/Popover'
import NavHeader from '../NavHeader'
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
              <Link
                to='/'
                className='text-base font-bold cursor-pointer hover:text-pink-600 py-1 relative after:absolute after:bottom-0 after:left-0
                                    after:bg-pink-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-100;'
              >
                Trang chủ
              </Link>

              <Popover
                className='flex items-center py-1  cursor-pointer shadow-red-700'
                renderPopover={
                  <div className='shadow-red-700'>
                    <div className='  w-[20rem] flex mt-0.5   items-center justify-between text-center  text-[10px]  px-auto rounded-3xl'>
                      <Link
                        to='/registerAT'
                        className='py-2 w-[9.9rem] h-8 bg-black border-2 border-black text-white rounded-l-3xl hover:bg-pink-400 hover:h-auto hover:text-center hover:shadow-3xl'
                      >
                        Đăng ký trở thành giảng viên
                      </Link>
                      <Link
                        to='/tutorList'
                        className='py-2 w-[9.9rem]  h-[2rem]  text-white  bg-black border-black border-2  rounded-r-3xl    hover:bg-pink-400  hover:h-full hover:text-center'
                      >
                        danh sách lớp
                      </Link>
                    </div>
                  </div>
                }
              >
                <div
                  className='text-base font-bold cursor-pointer hover:text-pink-600 py-1 relative after:absolute after:bottom-0 after:left-0
                                    after:bg-pink-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-100;'
                >
                  Loại dịch vụ
                </div>
              </Popover>
              <Link
                to='/'
                className='text-base font-bold cursor-pointer hover:text-pink-600 py-1 relative after:absolute after:bottom-0 after:left-0
                                    after:bg-pink-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-100;'
              >
                Hỗ trợ
              </Link>
            </div>
          </div>
          {/* Login */}

          <nav className='h-36 pt-[48px] col-span-3'>
            <NavHeader />
          </nav>
        </div>
      </div>
    </header>
  )
}
