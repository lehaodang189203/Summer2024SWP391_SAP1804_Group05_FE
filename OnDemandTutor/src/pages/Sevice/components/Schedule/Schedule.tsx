import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

interface ScheduleProps {
  value: { date: string; timeSlots: string[] }[] // Adjusted type
  onChange: (value: { date: string; timeSlots: string[] }[]) => void // Adjusted type
}

export default function Schedule({ value, onChange }: ScheduleProps) {
  const [weekDates, setWeekDates] = useState<Date[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const generateWeekDates = () => {
    const today = new Date()
    const startDate = new Date(today)
    const dates: Date[] = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push(date)
    }
    setWeekDates(dates)
  }

  useEffect(() => {
    generateWeekDates()
  }, [])

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date)
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

    const newSchedule = [...value]
    const existingDateIndex = newSchedule.findIndex(
      (scheduleItem) => scheduleItem.date === formattedDate
    )
    if (existingDateIndex >= 0) {
      newSchedule[existingDateIndex].date = formattedDate
    } else {
      newSchedule.push({ date: formattedDate, timeSlots: [] })
    }
    onChange(newSchedule)
  }

  const handlePreviousWeek = () => {
    setWeekDates((prevWeekDates) => {
      const newDates = [...prevWeekDates]
      const firstDate = newDates[0]
      const newStartDate = new Date(firstDate)
      newStartDate.setDate(firstDate.getDate() - 7)
      for (let i = 0; i < 7; i++) {
        const date = new Date(newStartDate)
        date.setDate(newStartDate.getDate() + i)
        newDates[i] = date
      }
      return newDates
    })
  }

  const handleNextWeek = () => {
    setWeekDates((prevWeekDates) => {
      const newDates = [...prevWeekDates]
      const firstDate = newDates[0]
      const newStartDate = new Date(firstDate)
      newStartDate.setDate(firstDate.getDate() + 7)
      for (let i = 0; i < 7; i++) {
        const date = new Date(newStartDate)
        date.setDate(newStartDate.getDate() + i)
        newDates[i] = date
      }
      return newDates
    })
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

  return (
    <div className='mb-4 w-full mx-auto'>
      <label className='block text-gray-700 text-sm font-bold mb-2'>
        Chọn lịch:
      </label>
      <div className='flex justify-between items-center mb-2'>
        <button
          type='button'
          onClick={handlePreviousWeek}
          className='bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded focus:outline-none'
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span>
          {weekDates.length > 0 &&
            `${weekDates[0].getDate()}/${
              weekDates[0].getMonth() + 1
            } - ${weekDates[6].getDate()}/${
              weekDates[6].getMonth() + 1
            }, ${weekDates[6].getFullYear()} `}
        </span>
        <button
          type='button'
          onClick={handleNextWeek}
          className='bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded focus:outline-none'
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className='flex flex-wrap'>
        {weekDates.map((date, index) => (
          <div
            key={index}
            className={`flex items-center justify-center space-x-2 mb-2 p-2 w-[22%] px-auto border-2 mx-2 my-1 rounded-xl hover:bg-slate-200 transition duration-150 ${
              selectedDate?.getTime() === date.getTime() ? 'bg-blue-200' : ''
            }`}
            onClick={() => handleSelectDate(date)}
          >
            <div className='flex items-center flex-col'>
              <span className='font-bold'>{getDayOfWeek(date)}</span>
              <div className='p-1 mt-2'>
                <span>{date.getDate()}</span>
                <span>/</span>
                <span>{date.getMonth() + 1}</span>
                <span>/</span>
                <span>{date.getFullYear()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
