import { useMutation } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
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

  const { profile } = useContext(AppContext)

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
      <div className='bg-white p-8 rounded-lg w-1/2 text left'>
        <h2 className='text-2xl mb-4'>Xác nhận chọn dịch vụ</h2>
        <p>
          <strong>Môn:</strong> {classInfo.subject}
        </p>
        <p>
          <strong>Lớp:</strong> {classInfo.class}
        </p>

        <p>
          <strong>Ngày học:</strong> {selectedDate}
        </p>
        <p>
          <strong>Giờ học:</strong> {selectedTimeSlots}
        </p>
        <label className='block mt-4'>
          <span className='text-gray-700'>Chọn thời gian thuê :</span>
          <select
            value={duration}
            onChange={handleDurationChange}
            className='block w-full mt-1 border-gray-300 rounded-md'
          >
            <option value={30}>30 phút</option>
            <option value={60}>60 phút</option>
            <option value={90}>90 phút</option>
            <option value={120}>120 phút</option>
            <option value={150}>150 phút</option>
            <option value={180}>180 phút</option>
          </select>
        </label>
        <p className='mt-4'>
          <strong>Tổng tiền:</strong> {calculateTotalPrice()} VNĐ
        </p>
        <div className='mt-6 flex justify-end'>
          <button
            type='button'
            onClick={onClose}
            className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2'
          >
            Hủy
          </button>
          <button
            type='button'
            onClick={handleConfirm}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
          >
            Chấp nhận
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalChooseService
