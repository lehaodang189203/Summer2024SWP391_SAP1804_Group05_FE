import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='bg-white py-5 w-full border-red-500 border-2'>
      <div className='container justify-center flex'>
        <form
          style={{ background: '#F7F3F3', boxShadow: 'rgba(0, 0, 0, 0.1) -18px 20px 4px 7px' }}
          className='p-10 w-4/12  rounded-2xl shadow-neutral-950'
        >
          <div className='text-2xl'>Đăng Ký</div>
          <div className='mt-8'>
            <input
              type='email'
              placeholder='Email'
              className='p-3 w-full outline-none  border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl hover:border-black border-2'
            />
          </div>
          <div className='mt-3'>
            <input
              type='password'
              placeholder='Mật Khẩu'
              className='p-3 w-full outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  hover:border-black border-2'
            />
          </div>
          <div className='mt-3'>
            <input
              type='password'
              placeholder='Xác nhận mật Khẩu'
              className='p-3 w-full outline-none border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-xl  hover:border-black border-2'
            />
          </div>
          <div className='mt-3'>
            <button className='w-full  rounded-xl text-center bg-pink-300 py-4 px-2 uppercase  text-white text-sm hover:bg-pink-600 flex justify-center items-center'>
              Đăng Ký
            </button>
          </div>

          <div className='NleHE1'>
            <span>---------------------------</span>
            <span className='EMof35'>hoặc</span>
            <span>---------------------------</span>
          </div>

          <div className='justify-center flex py-2'>
            <button className=' bg-black text-white border-black border-2 w-[300px] rounded-lg justify-center items-center flex py-2 shadow-2xl hover:bg-white hover:text-black'>
              <div className='pr-2'>
                <FontAwesomeIcon icon={faGoogle} />
              </div>
              <div>Google</div>
            </button>
          </div>
          <div className='my-4'>
            <div>
              <span className='text-gray-600 mr-1'>Bạn đã có tài khoảng?</span>
              <Link className='text-gray-500 underline hover:text-red-500' to='/Login'>
                Đăng Nhập
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
