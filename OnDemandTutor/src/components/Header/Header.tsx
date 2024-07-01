import { Link } from 'react-router-dom'
import BUMBUM from '../../assets/img/BUMBUM.png'
import Popover from '../Popover/Popover'
import NavHeader from '../NavHeader'
import { path } from '../../constant/path'
import { getProfileFromLS } from '../../utils/auth'
import { User } from '../../types/user.type'
import { roles } from '../../constant/roles'

const user: User = getProfileFromLS()

export default function Header() {
  return (
    <header className='h-[8rem] bg-transparent w-full border-2 shadow-lg rounded-2xl mt-2 mb-5 hover:shadow-black hover:shadow-lg'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-12 gap-1 items-end'>
          <nav className='h-50 flex items-start col-span-3 pr-20'>
            <Link to='/'>
              <div className='w-32 pt-[100%] mt-2 relative'>
                <div className='absolute top-0 left-0 w-[250px] h-full object-cover'>
                  <img src={BUMBUM} alt='logo' />
                </div>
              </div>
            </Link>
          </nav>
          <div className='h-36 col-span-4 text-2xl'>
            <div className='pr-[50px] pt-[40px] justify-around items-center flex'>
              <Link
                to='/'
                className='text-base font-bold cursor-pointer hover:text-pink-600 py-1 relative after:absolute after:bottom-0 after:left-0
                                    after:bg-pink-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-100;'
              >
                Trang chủ
              </Link>
              <Popover
                className='flex items-center py-1 cursor-pointer'
                renderPopover={
                  <div className='rounded-3xl shadow-black shadow-xl'>
                    <div className='w-[20rem] flex mt-0.5 items-center justify-between text-center text-[10px] px-auto rounded-sm'>
                      {user.roles !== roles.admin &&
                        user.roles !== roles.moderator && (
                          <Link
                            to={path.registerAsTutor}
                            className='py-2 w-[10rem] h-full bg-pink-400 text-black rounded-l-3xl hover:text-white hover:bg-black hover:shadow-xl hover:shadow-white'
                          >
                            Đăng ký thành giảng viên
                          </Link>
                        )}
                      <Link
                        to={path.requestList}
                        className='py-2 w-[10rem] h-full bg-pink-400 text-black rounded-r-3xl hover:text-white hover:bg-black hover:shadow-xl hover:shadow-white'
                      >
                        Danh sách lớp
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
          <nav className='h-36 pt-[48px] col-span-5'>
            <NavHeader />
          </nav>
        </div>
      </div>
    </header>
  )
}
