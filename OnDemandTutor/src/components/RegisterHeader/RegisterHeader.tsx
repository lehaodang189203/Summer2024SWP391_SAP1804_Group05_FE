import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
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
                  <div className='absolute top-0 left-0  w-full h-full object-cover '>
                    <img src={logo} alt='logo' />
                  </div>
                </div>
              </div>
            </Link>
          </nav>
          {/*  input */}
          <form className='col-span-6 pb-20 px-2'>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                placeholder='Tìm kím gia sư và các khóa học'
                className='text-black px-3 py-2 flex-grow rounded-lg border-black border-2 outline-none bg-transparent'
              />
              {/* kính lúp*/}
              <button className='rounded-lg mx-2 py-2 px-6 flex-shrink-0 bg-black text-white hover:opacity-90'>
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
          </form>
          <div className='col-span-4 pb-24 justify-between items-center flex'>
            <Link to='/' className='text-center'>
              Trang chủ
            </Link>

            <Link to='/' className='text-center'>
              Loại dịch vụ
            </Link>

            <Link to='/' className='text-center'>
              Hỗ trợ
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
