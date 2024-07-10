import { useMutation } from '@tanstack/react-query'
import React, { useContext, useState, useEffect } from 'react'
import { studentApi } from '../../../../api/student.api' // Ensure the path to your API file is correct
import { toast } from 'react-toastify'
import { AppContext } from '../../../../context/app.context'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  selectedDate: string
  selectedTimeSlots: string
  classInfo: {
    idService: string
    pricePerHour: number
    title: string
    subject: string
    class: string
    description: string
    learningMethod: string
  } | null
}

interface FormData {
  idService: string
  pricePerHour: number
  title: string
  subject: string
  class: string
  description: string
  learningMethod: string
}

export interface DataType {
  duration: number
  price: number
  date: string
  timeAvalable: string
}

const ModalChooseService: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedDate,
  selectedTimeSlots,
  classInfo
}) => {
  const [duration, setDuration] = useState<number>(30)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])

  const { profile } = useContext(AppContext)

  useEffect(() => {
    if (selectedTimeSlots) {
      setAvailableTimeSlots(selectedTimeSlots.split(', '))
    }
  }, [selectedTimeSlots])

  const handleDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDuration(Number(event.target.value))
  }

  const calculateTotalPrice = () => {
    return ((classInfo?.pricePerHour || 0) * duration) / 60
  }

  const bookingMutation = useMutation({
    mutationFn: (body: DataType) =>
      studentApi.BookingServiceLearning(
        profile?.id as string,
        classInfo?.idService as string,
        body
      )
  })

  const handleConfirm = () => {
    if (!classInfo) return

    const bookingData: DataType = {
      duration,
      price: calculateTotalPrice(),
      date: selectedDate,
      timeAvalable: selectedTimeSlots
    }
    console.log('bookingData', bookingData)
    bookingMutation.mutate(bookingData, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        onConfirm() // Call onConfirm to handle actions after booking
      }
    })
  }

  if (!isOpen || !classInfo) {
    return null
  }

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50'>
      <div className='bg-white p-8 rounded-lg w-1/2 text-left shadow-lg'>
  <h2 className='text-2xl mb-4 text-gray-800 font-semibold text-center'>Xác nhận chọn dịch vụ</h2>
  <div className='text-gray-700 mb-5'>
    <p className='mb-2'>
      <strong>Môn:</strong> {classInfo.subject}
    </p>
    <p className='mb-2'>
      <strong>Lớp:</strong> {classInfo.class}
    </p>
    <p className='mb-2'>
      <strong>Ngày học:</strong> {selectedDate}
    </p>
    <div className='flex mx-auto gap-1'>
        <p>
          <strong>Giờ học:</strong>
        </p>
        {' '}
        <div className=''>
          {availableTimeSlots.map((timeSlot, index) => (
            <div key={index} className=''>
              {timeSlot}
            </div>
          ))}
        </div>
    </div>
    
  </div>
  <hr />
  <div className='mx-auto'>
    <div className='text-gray-700 font-semibold text-center'>Chọn thời gian thuê:</div>
    <div className='flex space-x-2 mt-2  '>
      {[30, 60, 90, 120, 150, 180].map((time) => (
        <button
          key={time}
          type='button'
          onClick={() => setDuration(time)}
          className={`py-2 px-4 rounded-md border ${
            duration === time
              ? 'bg-pink-500 text-white border border-black'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {time} phút
        </button>
      ))}
    </div>
  </div>
  <p className='mt-4 text-gray-700 '>
    <strong>Tổng tiền:</strong> <span className='text-green-600'>{calculateTotalPrice()} VNĐ</span>
  </p>
  <div className='mt-6 flex justify-end'>
    <button
      type='button'
      onClick={onClose}
      className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2 transition duration-200'
    >
      Hủy
    </button>
    <button
      type='button'
      onClick={handleConfirm}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200'
    >
      Chấp nhận
    </button>
  </div>
</div>


    </div>
  )
}

export default ModalChooseService
