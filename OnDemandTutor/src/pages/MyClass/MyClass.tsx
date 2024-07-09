import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { studentApi } from '../../api/student.api'
import { AppContext } from '../../context/app.context'
import { Classrequest, Request } from '../../types/request.type'
import Review from './Review'
import { Modal } from 'antd'
import DetailInfor from './Detail'
import { TutorRep, User, UserRep } from '../../types/user.type'

export default function MyClass() {
  const { profile } = useContext(AppContext)
  console.log('profile', profile)

  const { data } = useQuery({
    queryKey: ['Account', profile?.id],
    queryFn: () => studentApi.classActive(profile?.id as string),
    placeholderData: keepPreviousData,
    enabled: !!profile?.id
  })

  console.log(data?.data.data)
  const classMutation = useMutation({
    mutationFn: (idReq: string) => studentApi.classCompled(idReq)
  })

  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCompleteClass = (idRequest: string) => {
    classMutation.mutate(idRequest, {
      onSuccess: () => {
        toast.success('Kết thúc lớp thành công'), setSelectedClass(idRequest)
      },
      onError: (data) => {
        toast.error(data.message)
      }
    })
  }

  const handleOpenModal = (idRequest: string) => {
    setSelectedClass(idRequest)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const requestList = data?.data.data || []

  return (
    <div>
      {data?.data.data &&
        (Array.isArray(requestList) ? requestList : []).map(
          (req: Classrequest) => (
            <div
              key={req.idClassRequest}
              className='rounded-3xl my-5'
              onMouseEnter={() => setHovered(req.idClassRequest)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Parent */}
              <div className='w-[33rem] h-auto rounded-3xl px-5 hover:shadow-2xl hover:shadow-black border-2 mx-auto transition-shadow duration-500'>
                <div className='my-2'>
                  <h2 className='text-red-600 text-2xl'>{req.title}</h2>
                </div>
                <div className='text-[1rem] text-left'>
                  <div>
                    Môn dạy:{' '}
                    <span className='text-blue-500 font-bold text-md'>
                      {req.subject}
                    </span>
                  </div>
                  <div className='my-1'>
                    Lớp dạy:{' '}
                    <span className='text-blue-500 font-bold text-md'>
                      {req.class}
                    </span>
                  </div>
                  <div className='my-1'>
                    Mức lương:{' '}
                    <span className='text-red-400 font-bold text-md'>
                      {req.price}
                    </span>
                  </div>
                  <div className='my-1'>
                    Ngày học:{' '}
                    <span className='text-black font-bold text-md'>
                      {req.timeTable}
                    </span>
                  </div>
                  <div className='my-1'>
                    Thời gian bắt đầu:{' '}
                    <span className='text-black font-bold text-md'>
                      {req.timeStart}
                    </span>
                  </div>
                  <div className='my-1'>
                    Thời gian kết thúc{' '}
                    <span className='text-black font-bold text-md'>
                      {req.timeEnd}
                    </span>
                  </div>
                  <div className='my-1'>
                    Hình thức:{' '}
                    <span className='text-black font-bold text-md'>
                      {req.learningMethod}
                    </span>
                  </div>
                  <div className='my-1'>
                    Mô tả:{' '}
                    <span className='text-black font-bold text-md'>
                      {req.description}
                    </span>
                  </div>
                  <div className='my-1'>
                    Trạng thái:{' '}
                    <span className='text-black font-bold text-md'>
                      {req.status}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`w-[33rem] flex justify-between transition-max-height duration-300 ease-in-out mx-auto ${
                  hovered === req.idClassRequest
                    ? 'max-h-20'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <div className='w-[49%] flex items-center justify-center'>
                  <button
                    onClick={() => handleOpenModal(req.idClassRequest)}
                    className='w-full bg-pink-400 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-200'
                  >
                    Chi tiết
                  </button>
                </div>
                <div className='w-[49%] flex items-center justify-center'>
                  <button
                    onClick={() => handleCompleteClass(req.idClassRequest)}
                    className='w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-400'
                  >
                    Kết thúc lớp
                  </button>
                </div>
              </div>
              {selectedClass === req.idClassRequest && (
                <Review idClassRequest={req.idClassRequest} />
              )}
              {isModalOpen && (
                <DetailInfor
                  User={req.user as UserRep}
                  Tutor={req.tutor as TutorRep}
                />
              )}
            </div>
          )
        )}
    </div>
  )
}
