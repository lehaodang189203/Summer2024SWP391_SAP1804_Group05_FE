import { useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import { path } from '../../constant/path'

import { yupResolver } from '@hookform/resolvers/yup'

import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Input from '../../components/Input'
import InputNumber from '../../components/InputNumber'
import { RequiredSchema, requestSchema as Schema } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import { RequestBody } from '../../types/user.request.type'
import { studentApi } from '../../api/student.api'
import FormRequest from '../FormRequest/FormRequest'

type FormData = Pick<
  RequiredSchema,
  | 'title'
  | 'date'
  | 'LearningMethod'
  | 'class'
  | 'price'
  | 'subject'
  | 'timeEnd'
  | 'timeStart'
  | 'description'
>
const requestSchema = Schema.pick([
  'title',
  'date',
  'LearningMethod',
  'class',
  'price',
  'subject',
  'timeEnd',
  'timeStart',
  'description'
])

export default function RequestList() {
  const [showForm, setShowForm] = useState(false)

  const handleOpenPopup = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  // Sử dụng useForm để quản lý form và validation

  //   const handleCancel = () => {
  //     setShowConfirmation(true) // Hiển thị thông báo xác nhận
  //   }

  const constMaxCharacter = 210

  const items = Array.from({ length: 10 }, (_, index) => index)

  // const items = Array.from({ length: 10 }, (_, index) => index)

  return (
    <div className='container'>
      {items.map((index) => (
        <div className='grid grid-cols-12  bg-transparent' key={index}>
          <div className='col-span-6   w-[600px] h-auto rounded-3xl  mx-5  my-5 px-5 hover:shadow-2xl hover:shadow-black  '>
            <div>
              {/*  status */}
              <div className='my-2'>
                <h2 className='text-red-600 text-2xl'>Lớp chưa giao</h2>
              </div>

              {/* description */}
              <div className='text-[1rem] text-left'>
                <div className=''>
                  Môn dạy:{' '}
                  <span className='text-blue-500 font-bold text-md'>Toán</span>
                </div>

                <div className='my-1'>
                  Lớp dạy:{' '}
                  <span className='text-blue-500 font-bold text-md'>Lớp11</span>
                </div>

                <div className='my-1'>
                  Địa chỉ:{' '}
                  <span className='text-black font-bold text-md'>
                    Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9
                  </span>
                </div>

                <div className='my-1'>
                  Mức lương:{' '}
                  <span className='text-red-400 font-bold text-md'>
                    2.160.000đ/tháng, 180k/buổi
                  </span>
                </div>

                <div className='my-1'>
                  Số buổi:{' '}
                  <span className='text-black font-bold text-md'>
                    3 Buổi /Tuần – Dạy 120phút/Buổi
                  </span>{' '}
                </div>

                <div className='my-1'>
                  Thời gian:{' '}
                  <span className='text-black font-bold text-md'>
                    {' '}
                    Chọn Sáng T2345 (10h - 12h)
                  </span>{' '}
                </div>

                <div className='my-1'>
                  Thông tin:{' '}
                  <span className='text-black font-bold text-md'>
                    {' '}
                    Học Sinh Nữ (Lớp 10 Lên 11), Trường Vinschool
                  </span>
                </div>
                <div className='my-1'>
                  Yêu cầu:{' '}
                  <span className='text-black font-bold text-md'>
                    Sinh Viên Nam/Nữ
                  </span>{' '}
                </div>
                <div className='my-1'>
                  Hình thức:{' '}
                  <span className='text-black font-bold text-md'>
                    {' '}
                    Dạy Offline (Trực Tiếp)
                  </span>
                </div>
                <div className='my-1'>
                  Liên hệ:{' '}
                  <span className='text-black font-bold text-md'>
                    0373.580.580 - 0932.609.268
                  </span>{' '}
                </div>
              </div>
              {/* button */}
              <div className='col-span-4 w-full  items-end flex'>
                {/* Button */}
                <div className='  my-4 w-full px-auto mx-auto'>
                  <div className='border-black border-[3px] rounded-lg w-full h-10   bg-pink-400 hover:opacity-80 mx-auto'>
                    <Link
                      to='/'
                      className=' justify-center items-center flex py-2'
                    >
                      Nhận Lớp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-6 w-[600px] h-auto rounded-3xl  mx-auto  my-5 px-5 hover:shadow-2xl hover:shadow-black'>
            <div>
              {/*  status */}
              <div className='my-2'>
                <h2 className='text-red-600 text-2xl'>Lớp chưa giao</h2>
              </div>

              {/* description */}
              <div className='text-[1rem] text-left'>
                <div className=''>
                  Môn dạy:{' '}
                  <span className='text-blue-500 font-bold text-md'>Toán</span>
                </div>

                <div className='my-1'>
                  Lớp dạy:{' '}
                  <span className='text-blue-500 font-bold text-md'>Lớp11</span>
                </div>

                <div className='my-1'>
                  Địa chỉ:{' '}
                  <span className='text-black font-bold text-md'>
                    Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, Quận 9
                  </span>
                </div>

                <div className='my-1'>
                  Mức lương:{' '}
                  <span className='text-red-400 font-bold text-md'>
                    2.160.000đ/tháng, 180k/buổi
                  </span>
                </div>

                <div className='my-1'>
                  Số buổi:{' '}
                  <span className='text-black font-bold text-md'>
                    3 Buổi /Tuần – Dạy 120phút/Buổi
                  </span>{' '}
                </div>

                <div className='my-1'>
                  Thời gian:{' '}
                  <span className='text-black font-bold text-md'>
                    {' '}
                    Chọn Sáng T2345 (10h - 12h)
                  </span>{' '}
                </div>

                <div className='my-1'>
                  Thông tin:{' '}
                  <span className='text-black font-bold text-md'>
                    {' '}
                    Học Sinh Nữ (Lớp 10 Lên 11), Trường Vinschool
                  </span>
                </div>
                <div className='my-1'>
                  Yêu cầu:{' '}
                  <span className='text-black font-bold text-md'>
                    Sinh Viên Nam/Nữ
                  </span>{' '}
                </div>
                <div className='my-1'>
                  Hình thức:{' '}
                  <span className='text-black font-bold text-md'>
                    {' '}
                    Dạy Offline (Trực Tiếp)
                  </span>
                </div>
                <div className='my-1'>
                  Liên hệ:{' '}
                  <span className='text-black font-bold text-md'>
                    0373.580.580 - 0932.609.268
                  </span>{' '}
                </div>
              </div>
              {/* button */}
              <div className='col-span-4 w-full  items-end flex'>
                {/* Button */}
                <div className='  my-4 w-full px-auto mx-auto'>
                  <div className='border-black border-[3px] rounded-lg w-full h-10   bg-pink-400 hover:opacity-80 mx-auto'>
                    <Link
                      to={path.detailRequest}
                      className=' justify-center items-center flex py-2'
                    >
                      Nhận Lớp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Nút dấu cộng */}
      <div className='fixed bottom-6 right-6'>
        <button
          onClick={handleOpenPopup}
          className='mb-10 bg-black text-white rounded-full p-4 shadow-lg hover:bg-transparent transition-all duration-300 hover:text-black shadow-black hover: relative group'
        >
          +
          <span className='absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 w-[3rem] p-2 text-white bg-black rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            Bấm vào để tạo lớp
          </span>
        </button>
        {showForm && <FormRequest onClose={handleCloseForm} />}
      </div>

      <Pagination pageSize={10} />
    </div>
  )
}
