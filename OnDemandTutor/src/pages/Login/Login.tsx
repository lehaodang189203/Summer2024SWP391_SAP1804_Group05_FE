import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='bg-white py-5 w-full border-red-500 border-2'>
      <div className='container justify-center flex'>
        <form style={{ background: '#F7F3F3' }} className='p-10  shadow-sm border-black border-2 w-4/12  rounded-2xl '>
          <div className='text-2xl'>Đăng nhập</div>
          <div className='mt-8'>
            <input
              type='email'
              placeholder='Email'
              className='p-3 w-full outline-none border border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-sm'
            />
          </div>
          <div className='mt-3'>
            <input
              type='password'
              placeholder='password'
              className='p-3 w-full outline-none border border-gray-300 forcus:border-gray-500 forcus:shawdow-sm rounded-sm'
            />
          </div>
          <div className='mt-3'>
            <button className='w-full  rounded-xl text-center bg-blue-500 py-4 px-2 uppercase  text-white text-sm hover:bg-blue-300 flex justify-center items-center'>
              Đăng nhập
            </button>
          </div>
          <div className='mt-8 '>
            <div>
              <span className='text-gray-600 mr-1'>Bạn chưa có tài khoảng?</span>
              <Link className='text-gray-500 underline hover:text-red-500' to='/Register'>
                Đăng Ký
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
