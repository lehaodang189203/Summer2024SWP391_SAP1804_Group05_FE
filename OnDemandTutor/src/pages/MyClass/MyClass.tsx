import React, { useState } from 'react'

const TutorCard = () => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className=' rounded-3xl'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/*  cha */}
      <div className='w-[33rem] h-auto rounded-3xl   my-5 px-5 hover:shadow-2xl hover:shadow-black border-2 mx-auto '>
        <div className='my-2'>
          <h2 className='text-red-600 text-2xl'>Tìm Gia sư</h2>
        </div>
        <div className='text-[1rem] text-left'>
          <div>
            Môn dạy:{' '}
            <span className='text-blue-500 font-bold text-md'>Lịch Sử</span>
          </div>
          <div className='my-1'>
            Lớp dạy: <span className='text-blue-500 font-bold text-md'>11</span>
          </div>
          <div className='my-1'>
            Mức lương:{' '}
            <span className='text-red-400 font-bold text-md'>100000</span>
          </div>
          <div className='my-1'>
            Ngày học:{' '}
            <span className='text-black font-bold text-md'>T3,T5,T7</span>
          </div>
          <div className='my-1'>
            Thời gian bắt đầu:{' '}
            <span className='text-black font-bold text-md'>10:30</span>
          </div>
          <div className='my-1'>
            Thời gian kết thúc{' '}
            <span className='text-black font-bold text-md'>12:30</span>
          </div>
          <div className='my-1'>
            Hình thức:{' '}
            <span className='text-black font-bold text-md'>học off</span>
          </div>
          <div className='my-1'>
            Mô tả:{' '}
            <span className='text-black font-bold text-md'>
              Mong muốn điểm 10
            </span>
          </div>
        </div>
      </div>
      <div
        className={`w-[33rem]  flex justify-between transition-max-height duration-300 ease-in-out mx-auto   ${
          hovered ? 'max-h-20' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className='w-[49%] flex items-center justify-center'>
          <button className='w-full bg-pink-400 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-200'>
            Chi tiết
          </button>
        </div>
        <div className='w-[49%] flex items-center justify-center'>
          <button className='w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-400  '>
            Kết thúc lớp
          </button>
        </div>
      </div>
    </div>
  )
}

export default TutorCard
