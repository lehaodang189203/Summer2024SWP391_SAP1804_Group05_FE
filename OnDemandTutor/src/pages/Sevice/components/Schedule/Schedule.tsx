import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

interface ScheduleProps {
  value: { date: string; timeSlots: string[] }[]
  onChange: (value: { date: string; timeSlots: string[] }[]) => void
}

export default function Schedule({ value, onChange }: ScheduleProps) {
  const [weekDates, setWeekDates] = useState<Date[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])

  useEffect(() => {
    const today = new Date()
    setSelectedDate(today) // Set default value to today
    generateWeekDates(today)
  }, [])

  const generateWeekDates = (start: Date) => {
    const dates: Date[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(start)
      date.setDate(start.getDate() + i)
      dates.push(date)
    }
    setWeekDates(dates)
  }

  const handleSelectDate = (date: Date) => {
    // Không cần kiểm tra điều kiện ngày hiện tại ở đây

    // Nếu chọn lại ngày đã chọn, hủy chọn
    if (selectedDate && date.getTime() === selectedDate.getTime()) {
      setSelectedDate(null)
      setSelectedTimes([])

      // Xóa ngày đó khỏi danh sách nếu có trong value
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
      const newValue = value.filter((v) => v.date !== formattedDate)
      onChange(newValue)
      return
    }

    setSelectedDate(date)

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

    const existingDateIndex = value.findIndex(
      (scheduleItem) => scheduleItem.date === formattedDate
    )
    if (existingDateIndex >= 0) {
      setSelectedTimes(value[existingDateIndex].timeSlots)
    } else {
      setSelectedTimes([])
    }

    if (existingDateIndex === -1) {
      onChange([...value, { date: formattedDate, timeSlots: [] }])
    }
  }

  const handlePreviousWeek = () => {
    if (!weekDates.length) return
    const firstDate = weekDates[0]
    const newStartDate = new Date(firstDate)
    newStartDate.setDate(firstDate.getDate() - 7)
    generateWeekDates(newStartDate)
  }

  const handleNextWeek = () => {
    if (!weekDates.length) return
    const firstDate = weekDates[0]
    const newStartDate = new Date(firstDate)
    newStartDate.setDate(firstDate.getDate() + 7)
    generateWeekDates(newStartDate)
  }

  const getDayOfWeek = (date: Date | undefined) => {
    if (!date) return ''
    const daysOfWeek = [
      'Chủ nhật',
      'Thứ hai',
      'Thứ ba',
      'Thứ tư',
      'Thứ năm',
      'Thứ sáu',
      'Thứ bảy'
    ]
    return daysOfWeek[date.getDay()]
  }

  const handleTimeClick = (time: string) => {
    if (!selectedDate) return

    let newSelectedTimes = selectedTimes
    if (selectedTimes.includes(time)) {
      newSelectedTimes = selectedTimes.filter((t) => t !== time)
    } else {
      newSelectedTimes = [...selectedTimes, time]
    }
    setSelectedTimes(newSelectedTimes)

    const formattedDate = `${selectedDate.getFullYear()}-${(
      selectedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`

    const newValue = value.map((v) =>
      v.date === formattedDate ? { ...v, timeSlots: newSelectedTimes } : v
    )
    onChange(newValue)
  }

  const renderTimeSlots = (slots: { time: string; selected: boolean }[]) => (
    <div className='flex flex-wrap mt-2 mx-[2rem]'>
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`px-2 py-2 border-2 mr-2 mb-2 cursor-pointer rounded-lg hover:bg-slate-200 transition duration-75 ${
            slot.selected ? 'bg-blue-300' : 'bg-white'
          }`}
          onClick={() => handleTimeClick(slot.time)}
        >
          {slot.time}
        </div>
      ))}
    </div>
  )

  const morningSlots = []
  const afternoonSlots = []

  for (let hour = 0; hour < 12; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`
      morningSlots.push({
        time,
        selected: selectedTimes.includes(time)
      })
    }
  }

  for (let hour = 12; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`
      afternoonSlots.push({
        time,
        selected: selectedTimes.includes(time)
      })
    }
  }

  return (
    <div>
      <label className='block text-gray-700 text-sm font-bold mb-2'>
        Chọn ngày học:
      </label>
      <div className='flex justify-between items-center mb-2'>
        <button
          className='hover:shadow-lg transition duration-75 rounded-lg'
          onClick={handlePreviousWeek}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className='flex-1 flex justify-center'>
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`w-16 p-2 mx-1 cursor-pointer rounded-lg hover:shadow-lg transition duration-75 ${
                selectedDate?.toDateString() === date.toDateString()
                  ? 'bg-pink-500 text-white'
                  : date < new Date() // Kiểm tra ngày trong quá khứ
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => date > new Date() && handleSelectDate(date)} // Chỉ cho phép chọn ngày trong tương lai
            >
              <div className='text-center text-sm'>
                {date.getDate().toString().padStart(2, '0')}/
                {(date.getMonth() + 1).toString().padStart(2, '0')}
              </div>
              <div className='text-center text-xs'>{getDayOfWeek(date)}</div>
            </div>
          ))}
        </div>
        <button
          className='hover:shadow-lg transition duration-75 rounded-lg'
          onClick={handleNextWeek}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className='w-full mx-auto'>
        <label className='block text-gray-700 text-sm font-bold my-5'>
          Thời gian lịch hẹn:
        </label>
        {selectedDate && (
          <div>
            <h3 className='text-center font-bold'>Buổi sáng</h3>
            {renderTimeSlots(morningSlots)}
            <h3 className='text-center font-bold mt-4'>Buổi chiều</h3>
            {renderTimeSlots(afternoonSlots)}
          </div>
        )}
      </div>
    </div>
  )
}
