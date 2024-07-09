
import {  useState } from "react"
import { TutorRep, User, UserRep } from "../../../types/user.type"
import { useMutation, useQuery } from "@tanstack/react-query"
import { studentApi } from "../../../api/student.api"
import userApi from "../../../api/user.api"
import { toast } from "react-toastify"
import { getProfileFromLS } from "../../../utils/auth"
import DetailInfor from "../../MyClass/Detail" // sửa lại để xài chung 
import { BookedServices } from "../../../types/request.type"
import ReviewService from "../ReviewService"


export default function BookedService() {
  const  profile = getProfileFromLS()// bí quá rồi mới xài nha 

  const { data } = useQuery({
    queryKey: ['Account'],
    queryFn: () => userApi.ViewClassService(profile.id as string)
  })

  const serviceMutation = useMutation({
    mutationFn: (idBook: string) => studentApi.serviceCompled(idBook)
  })

  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCompleteClass = (id: string) => {
    serviceMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Kết thúc lớp thành công'), setSelectedService(id)
      },
      onError: (data) => {
        toast.error(data.message)
      }
    })
  }

  const handleOpenModal = (idBoking: string) => {
    setSelectedService(idBoking)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const serviceList = data || []

  return (
    <div className=''>
      <div className="text-left">Dịch vụ đã đăng kí</div>
      {data &&
        (Array.isArray(serviceList) ? serviceList : []).map(
          (service: BookedServices) => ( //
            <div
              key={service.idBooking}
              className='rounded-3xl my-5'
              onMouseEnter={() => setHovered(service.idBooking)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Parent */}
              <div className='w-[33rem] h-auto rounded-3xl px-5 hover:shadow-2xl hover:shadow-black border-2 mx-auto transition-shadow duration-500'>
                <div className='my-2'>
                  <h2 className='text-red-600 text-2xl'>{service.title}</h2>
                </div>
                <div className='text-[1rem] text-left'>
                  <div>
                    Môn dạy:{' '}
                    <span className='text-blue-500 font-bold text-md'>
                      {service.subject}
                    </span>
                  </div>
                  <div className='my-1'>
                    Lớp dạy:{' '}
                    <span className='text-blue-500 font-bold text-md'>
                      {service.class}
                    </span>
                  </div>
                  <div className='my-1'>
                    Giá toàn dịch vụ:{' '}
                    <span className='text-red-400 font-bold text-md'>
                      {service.price}
                    </span>
                    {' '}VNĐ
                  </div>
                  <div className='my-1'>
                    Ngày học:{' '}
                    <span className='text-black font-bold text-md'>
                      {service.date}
                    </span>
                  </div>
                  <div className='my-1'>
                    Thời gian bắt đầu:{' '}
                    <span className='text-black font-bold text-md'>
                      {service.timeSlot}
                    </span>
                  </div>
                  <div className='my-1'>
                    Hình thức:{' '}
                    <span className='text-black font-bold text-md'>
                      {service.learningMethod}
                    </span>
                  </div>
                  <div className='my-1'>
                    Mô tả:{' '}
                    <span className='text-black font-bold text-md'>
                      {service.description}
                    </span>
                  </div>
                  <div className='my-1'>
                    Trạng thái:{' '}
                    <span className='text-black font-bold text-md'>
                      {service.status}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`w-[33rem] flex justify-between transition-max-height duration-300 ease-in-out mx-auto ${
                  hovered === service.idBooking
                    ? 'max-h-20'
                    : 'max-h-0 overflow-hidden'
                }`}
              >
                <div className='w-[49%] flex items-center justify-center'>
                  <button
                    onClick={() => handleOpenModal(service.idBooking)}
                    className='w-full bg-pink-400 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-200'
                  >
                    Chi tiết
                  </button>
                </div>
                <div className='w-[49%] flex items-center justify-center'>
                  <button
                    onClick={() => handleCompleteClass(service.idBooking)}
                    className='w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-400'
                  >
                    Kết thúc lớp
                  </button>
                </div>
              </div>
              {selectedService === service.idBooking && (
                <ReviewService idBooking={service.idBooking} />
              )}
              {isModalOpen && (
                <DetailInfor
                  User={service.user as UserRep}
                  Tutor={service.tutor as TutorRep}
                />
              )}
            </div>
          )
        )}
    </div>
  )
}
