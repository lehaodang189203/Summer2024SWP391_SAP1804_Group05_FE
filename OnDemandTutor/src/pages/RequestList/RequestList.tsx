import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { tutorApi } from '../../api/tutor.api'
import Pagination from '../../components/Pagination'
import FormRequest from '../FormRequest/FormRequest'

export interface DataType {
  id: string
  fullName: string
  subject: string
  title: string
  price: number
  description: string
  class: string
  learningMethod: string
  date: string
  timeStart: string
  timeEnd: string
}

export default function RequestList() {
  // Lấy danh sách yêu cầu từ API
  const { data: RequestData } = useQuery<DataType[]>({
    queryKey: ['Request'],
    queryFn: () => tutorApi.viewRequest(),
    placeholderData: []
  })

  const [showForm, setShowForm] = useState(false)

  const handleOpenPopup = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const items = RequestData || [] // Đảm bảo items là một mảng, nếu RequestData chưa có dữ liệu

  return (
    <>
      <div className='container grid grid-cols-2 gap-5'>
        {items.map((data) => (
          <div className='col-span-6 md:col-span-12 lg:col-span-6 xl:col-span-6'>
            <div className='w-full h-auto rounded-3xl mx-5 my-5 px-5 hover:shadow-2xl hover:shadow-black border border-gray-300'>
              <div className='my-2'>
                <h2 className='text-red-600 text-2xl'>{data.title}</h2>
              </div>
              <div className='text-[1rem] text-left'>
                <div>
                  Môn dạy:{' '}
                  <span className='text-blue-500 font-bold text-md'>
                    {data.subject}
                  </span>
                </div>
                <div className='my-1'>
                  Lớp dạy:{' '}
                  <span className='text-blue-500 font-bold text-md'>
                    {data.class}
                  </span>
                </div>

                <div className='my-1'>
                  Mức lương:{' '}
                  <span className='text-red-400 font-bold text-md'>
                    {data.price}
                  </span>
                </div>
                <div className='my-1'>
                  Ngày học:{' '}
                  <span className='text-black font-bold text-md'>
                    {data.date}
                  </span>
                </div>
                <div className='my-1'>
                  Thời gian bắt đầu:{' '}
                  <span className='text-black font-bold text-md'>
                    {data.timeStart}
                  </span>
                </div>
                <div className='my-1'>
                  Thời gian kết thúc{' '}
                  <span className='text-black font-bold text-md'>
                    {data.timeEnd}
                  </span>
                </div>

                <div className='my-1'>
                  Hình thức:{' '}
                  <span className='text-black font-bold text-md'>
                    {data.learningMethod}
                  </span>
                </div>

                <div className='my-1'>
                  Mô tả:{' '}
                  <span className='text-black font-bold text-md'>
                    {data.description}
                  </span>
                </div>
              </div>
              <div className='w-full items-end flex'>
                <div className='my-4 w-full px-auto mx-auto'>
                  <div className='border-black border-[3px] rounded-lg w-full h-10 bg-pink-400 hover:opacity-80 mx-auto'>
                    <Link
                      to='/'
                      className='justify-center items-center flex py-2'
                    >
                      Nhận Lớp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
    </>
  )
}
