import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ServiceTutor, ServiceTutorGet } from '../../../types/request.type'
import { tutorApi } from '../../../api/tutor.api'
import { AppContext } from '../../../context/app.context'
import ScheduleFormToChoose from '../components/ScheduleFormToChose'
import { toast } from 'react-toastify'

export default function TutorViewOwnService() {
    const {profile} = useContext(AppContext);
  const [selectedClassIndex, setSelectedClassIndex] = useState<number | null>(
    null
  )
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [classData, setClassData] = useState<ServiceTutorGet[]>([])

  const { data: Services, refetch } = useQuery({
    queryKey: ['allServiceOfTutor'],
    queryFn: () => tutorApi.getAllTutorService(profile?.id||'')
  })

  useEffect(() => {
    if (Services) {
      setClassData(Services)
    }
  }, [Services])

  const handleDateChange = (classIndex: number, date: string) => {
    setSelectedClassIndex(classIndex)
    setSelectedDate(date)
    setSelectedTimeSlot(null)
  }

  const handleTimeSlotChange = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
  }

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', { weekday: 'long' })
  }

  
  const openModal = () => {
    setIsModalOpen(true)
  }
  // phần hiện xem thêm cho decription
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const renderDescription = (description:string) => {
    const maxLength = 100;
    if (description.length <= maxLength) {
      return description;
    }
    return isDescriptionExpanded ? description : `${description.slice(0, maxLength)}...`;
  };

  const deleteServiceMutation = useMutation({
    mutationFn: (idService: string) => tutorApi.deleteTutorService(idService)
  });
  const handleDeleteService = (id: string) => {
    deleteServiceMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Xóa dịch vụ thành công');
      },
      onError: (data) => {
        toast.error(data.message);
        refetch()
      }
    });
  };
  return (
    <div className='w-2/3 border mx-auto grid gap-4'>
      <div className='text-wrap border-b-2 border bg-slate-50 '>
        Danh sách dịch vụ bạn
      </div>
      <hr />
      {classData.map((item, classIndex) => (
        <div
          key={classIndex}
          className='w-full bg-transparent border-2 rounded-2xl grid grid-cols-2 hover:shadow-xl transition-shadow translate-x-4 duration-700 shadow-md gap-2 bg-white'
        >
          <div className='col-span-1 p-4'>
            <h2 className='text-xl font-bold mb-2'>{item.serviceDetails.title}</h2>
            <div className='pl-10 p-7 bg-gray-100 rounded-lg shadow-md'>
              <div className='text-left h-full mx-auto'>
                <p className='mb-2'>
                  <strong className='text-pink-500'>Tiêu đề:</strong>{' '}
                  <span className={item.serviceDetails.title ? 'text-gray-800' : 'text-red-500'}>
                    {item.serviceDetails.title ? item.serviceDetails.title : 'Title trống'}
                  </span>
                </p>
                <p className='mb-2'>
                  <strong className='text-blue-700'>Môn học:</strong>{' '}
                  <span className='text-gray-800'>{item.serviceDetails.subject}</span>
                </p>
                <p className='mb-2'>
                  <strong className='text-blue-700'>Lớp:</strong>{' '}
                  <span className='text-gray-800'>{item.serviceDetails.class}</span>
                </p>
                <p className='mb-2'>
                  <strong className='text-blue-700'>Phương thức học:</strong>{' '}
                  <span className='text-gray-800'>{item.serviceDetails.learningMethod}</span>
                </p>
                <p className='mb-2'>
                  <strong className='text-blue-700'>Giá trên một giờ:</strong>{' '}
                  <span className='text-green-700'>{item.serviceDetails.pricePerHour} VNĐ</span>
                </p>
                <p>
                  <strong className='text-blue-700'>Mô tả:</strong>{' '}
                  <span className='text-gray-800'>{renderDescription(item.serviceDetails.description)}</span>
                  {item.serviceDetails.description.length > 100 && (
                    <button
                      onClick={toggleDescription}
                      className='text-blue-500 ml-2 hover:underline'
                    >
                      {isDescriptionExpanded ? 'Ẩn bớt' : 'Xem thêm'}
                    </button>
                  )}
                </p>
              </div>
            </div>
                <button
                    onClick={() => handleDeleteService(item.id)}
                    className='w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 mt-16'
                    >
                    Xóa Service
                </button>
          </div>
          <div className='col-span-1 p-4'>
            <p>
              <strong>Thời gian:</strong>
            </p>
            <ScheduleFormToChoose
              schedule={item.serviceDetails.schedule}
              classIndex={classIndex}
              selectedDate={
                selectedClassIndex === classIndex ? selectedDate : ''
              }
              handleDateChange={handleDateChange}
              handleTimeSlotChange={handleTimeSlotChange}
              getDayOfWeek={getDayOfWeek}
            />
            {/* {item.serviceDetails.schedule.map((date,index)=>(
                <div key={index} className='flex'>
                    <div>{date.date} có slots là :</div>
                    <div>
                        {date.timeSlots.map((timesl,indexT)=>(<div key={indexT}>
                            {timesl},
                        </div>))}
                    </div>
                </div>
            ))} */}
          </div>
        </div>
      ))}
      
    </div>
  )
}
