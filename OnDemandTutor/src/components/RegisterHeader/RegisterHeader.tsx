import { Link } from 'react-router-dom'
import newLogo from '../../assets/img/newLogo.png'
export default function RegisterHeader() {
  return (
    <header className='border-black border-2 mt-1 rounded-xl py-2 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-12 gap-4 mt-4 items-end '>
          {/* logo */}
          <nav className='flex items-end col-span-2'>
            <Link to='/'>
              <div className='  justify-end items-end flex '>
                <div className=' w-32 pt-[100%] mb-10 relative '>
                  <div className='absolute top-0 left-0  w-[180px] h-full object-cover '>
                    <img src={newLogo} alt='logo' />
                  </div>
                </div>
              </div>
            </Link>
          </nav>
          {/*  input */}
          <form className='col-span-7 pb-14 px-1'>
            <div className=' border-gray-400 border-[2px] rounded-md hover:border-black hover:border-[5px]'>
              <div className='bg-white  p-1 flex'>
                <input
                  type='text'
                  placeholder='Tìm kím gia sư và các khóa học'
                  className='text-black px-3 py-2 flex-grow rounded-lg  h-[4rem] outline-none bg-transparent'
                />
                {/* kính lúp*/}
                <button className='rounded-lg py-2 px-6 flex-shrink-0 border-l-0  text-black hover:opacity-90'>
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
                      d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
          <div className='col-span-3 pb-24 justify-between items-center flex'>
            <Link to='/' className='text-center font-bold hover:text-pink-600'>
              Trang chủ
            </Link>

            <Link to='/' className='text-center font-bold hover:text-pink-600'>
              Loại dịch vụ
            </Link>

            <Link to='/' className='text-center font-bold hover:text-pink-600'>
              Hỗ trợ
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
