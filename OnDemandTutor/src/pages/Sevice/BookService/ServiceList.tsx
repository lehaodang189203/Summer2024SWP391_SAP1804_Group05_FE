import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ModalChooseService from '../components/ModalChooseService'
import ScheduleFormToChoose from '../components/ScheduleFormToChose'
import { studentApi } from '../../../api/student.api'
import { ServiceTutor } from '../../../types/request.type'

export default function ServiceList() {
  const [selectedClassIndex, setSelectedClassIndex] = useState<number | null>(
    null
  )
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [classData, setClassData] = useState<ServiceTutor[]>([])

  const { data: classService, refetch } = useQuery({
    queryKey: ['allServices'],
    queryFn: () => studentApi.GetAllService()
  })

  useEffect(() => {
    if (classService) {
      setClassData(classService.data.data)
    }
  }, [classService])

  const handleDateChange = (classIndex: number, date: string) => {
    setSelectedClassIndex(classIndex)
    setSelectedDate(date)
    setSelectedTimeSlot(null)
  }

  const handleTimeSlotChange = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
  }

  const handleSubmit = () => {
    if (selectedClassIndex === null) return

    const newClassData = [...classData]
    const scheduleIndex = newClassData[selectedClassIndex].schedule.findIndex(
      (s) => s.date === selectedDate
    )
    if (scheduleIndex === -1) return

    newClassData[selectedClassIndex].schedule[scheduleIndex].timeSlots =
      selectedTimeSlot ? [selectedTimeSlot] : []
    setClassData(newClassData)
    setIsModalOpen(false)
    refetch() // Refetch the data
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
  return (
    <div className='w-2/3 border mx-auto grid gap-4'>
      <div className='text-wrap border-b-2 border bg-slate-50 '>
        Danh sách dịch vụ của giảng viên
      </div>
      <hr />
      {classData.map((item, classIndex) => (
        <div
          key={classIndex}
          className='w-full bg-transparent border-2 rounded-2xl grid grid-cols-2 hover:shadow-xl transition-shadow translate-x-4 duration-700 shadow-md gap-2 bg-white'
        >
          <div className='col-span-1 p-4'>
            <h2 className='text-xl font-bold mb-2'>{item.title}</h2>
            <div className='pl-10 p-7 bg-gray-100 rounded-lg shadow-md'>
              <div className='text-left h-full mx-auto'>
                <p className='mb-2'>
                  <strong className='text-pink-500'>Tiêu đề:</strong>{' '}
                  <span className={item.title ? 'text-gray-800' : 'text-red-500'}>
                    {item.title ? item.title : 'Title trống'}
                  </span>
                </p>
                <p className='mb-2'>
                  <strong className='text-blue-700'>Môn học:</strong>{' '}
                  <span className='text-gray-800'>{item.subject}</span>
                </p>
                <p className='mb-2'>
                  <strong className='text-blue-700'>Lớp:</strong>{' '}
                  <span className='text-gray-800'>{item.class}</span>
                </p>
                <p className='mb-2'>
                  <strong className='text-blue-700'>Phương thức học:</strong>{' '}
                  <span className='text-gray-800'>{item.learningMethod}</span>
                </p>
                <p className='mb-2'>
                  <strong className='text-blue-700'>Giá trên một giờ:</strong>{' '}
                  <span className='text-green-700'>{item.pricePerHour} VNĐ</span>
                </p>
                <p>
                  <strong className='text-blue-700'>Mô tả:</strong>{' '}
                  <span className='text-gray-800'>{renderDescription(item.description)}</span>
                  {item.description.length > 100 && (
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
          </div>
          <div className='col-span-1 p-4'>
            <p>
              <strong>Thời gian:</strong>
            </p>
            <ScheduleFormToChoose
              schedule={item.schedule}
              classIndex={classIndex}
              selectedDate={
                selectedClassIndex === classIndex ? selectedDate : ''
              }
              handleDateChange={handleDateChange}
              handleTimeSlotChange={handleTimeSlotChange}
              getDayOfWeek={getDayOfWeek}
            />
            {selectedClassIndex === classIndex && selectedTimeSlot && (
              <button
                type='button'
                onClick={openModal}
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4'
              >
                Xác nhận chọn
              </button>
            )}
          </div>
        </div>
      ))}
      <ModalChooseService
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
        selectedDate={selectedDate}
        selectedTimeSlots={selectedTimeSlot ? selectedTimeSlot : ''}
        classInfo={
          selectedClassIndex !== null ? classData[selectedClassIndex] : null
        }
      />
    </div>
  )
}
