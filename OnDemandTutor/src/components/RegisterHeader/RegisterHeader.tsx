import { Link } from 'react-router-dom'
import bule from '../../assets/img/bule.png'
// import newLogo from '../../assets/img/newLogo.png'
import BUMBUM from '../../assets/img/BUMBUM.png'
export default function RegisterHeader() {
  return (
    <header className=' h-[10rem] rounded-xl   bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-12 gap-4 items-end '>
          {/* logo */}
          <nav className='h-50 flex items-start col-span-3 pr-20'>
            <Link to='/'>
              <div className='w-32 pt-[100%] mt-2 relative '>
                <div className='absolute top-0 left-0  w-[250px] h-full object-cover '>
                  <img src={BUMBUM} alt='logo' />
                </div>
              </div>
            </Link>
          </nav>
          {/*  mid */}
          <div className=' h-36  col-span-6 text-2xl  '>
            <div className='pr-[50px] pt-[40px] justify-around items-center flex '>
              <Link to='/' className='text-center hover:text-pink-600'>
                Trang chủ
              </Link>

              <Link to='/' className='text-center   hover:text-pink-600'>
                Loại dịch vụ
              </Link>

              <Link to='/' className='text-center   hover:text-pink-600'>
                Hỗ trợ
              </Link>
            </div>
          </div>
          {/* input */}

          <div className='items-start flex  h-36 pt-[38px]'>
            <form className='col-span-3 border-pink-300 rounded-lg border-2 justify-center items-center flex hover:border-pink-400 hover:border-[5px]'>
              <div className=' rounded-sm p-1 flex  '>
                <input
                  type='text'
                  placeholder='Tìm kím'
                  className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent '
                />
                {/* kính lúp*/}
              </div>
              <button className=' rounded-sm  hover:opacity-90 mr-2'>
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
            </form>
          </div>
        </div>
      </div>
    </header>
  )
};