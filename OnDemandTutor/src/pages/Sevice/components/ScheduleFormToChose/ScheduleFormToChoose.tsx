import React, { useState, useEffect } from 'react';

interface ScheduleItem {
  date: string;
  timeSlots: string[];
}

interface ClassInfo {
  id: string;
  pricePerHour: number;
  tittle: string;
  subject: string;
  class: string;
  description: string;
  learningMethod: string;
  schedule: ScheduleItem[];
}

interface Props {
  classIndex: number;
  selectedDate: string;
  availableHours: string[];
  handleDateChange: (classIndex: number, date: string) => void;
  handleTimeSlotChange: (timeSlot: string) => void;
  getDayOfWeek: (dateString: string) => string;
  classData: ClassInfo[];
}

const ScheduleFormToChoose: React.FC<Props> = ({
  classIndex, selectedDate, availableHours, handleDateChange, handleTimeSlotChange, getDayOfWeek, classData
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const toggleTimeSlot = (timeSlot: string) => {
    if (selectedTimeSlot === timeSlot) {
      setSelectedTimeSlot(null);
      handleTimeSlotChange('');
    } else {
      setSelectedTimeSlot(timeSlot);
      handleTimeSlotChange(timeSlot);
    }
  };

  useEffect(() => {
    setSelectedTimeSlot(null);
  }, [selectedDate]);

  const handlePreviousWeek = () => {
    setCurrentWeekStart(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  };

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(currentWeekStart.getDate() + i);
    return date;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return { formattedDate: `${month}-${day}`, month, year };
  };

  const { month, year } = formatDate(currentWeekStart.toISOString().split('T')[0]);

  const hasTimeSlots = (dateString: string) => {
    const classSchedule = classData[classIndex]?.schedule || [];
    return classSchedule.some(scheduleItem => scheduleItem.date === dateString && scheduleItem.timeSlots.length > 0);
  };

  return (
    <div className="mb-2 border p-4 rounded bg-slate-50">
      <p className="text-center text-lg font-semibold">Tháng {month}-{year}</p>
      <div className="mt-2 flex justify-between mb-4 gap-1">
        <button
          type="button"
          onClick={handlePreviousWeek}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          {"<"}
        </button>
        <div className="mt-2 space-x-2 space-y-2">
          {weekDates.map((date) => {
            const dateString = date.toISOString().split('T')[0];
            const isSelected = selectedDate === dateString;
            return (
              <div key={date.toISOString()} className="inline-block text-center border rounded-sm">
                <button
                  type="button"
                  onClick={() => handleDateChange(classIndex, dateString)}
                  className={`bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ${isSelected ? 'bg-gray-500' : ''} ${hasTimeSlots(dateString) && !isSelected ? 'bg-pink-500' : 'bg-gray-300'}`}
                >
                  <div>{formatDate(dateString).formattedDate}</div>
                  <p className='bg-slate-50 p-0.5 rounded-md'>{getDayOfWeek(dateString)}</p>
                </button>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleNextWeek}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          {">"}
        </button>
      </div>
      <hr />
      <div className='text-left mt-2 ml-2'>Chọn giờ bắt đầu:</div>
      <div className="space-x-1">
        {availableHours.length > 0 ? availableHours.map((hour) => (
          <button
            key={hour}
            type="button"
            onClick={() => toggleTimeSlot(hour)}
            className={`bg-pink-200 border hover:bg-pink-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ${selectedTimeSlot === hour ? 'bg-pink-600 border-stone-600 border' : ''}`}
          >
            {hour}
          </button>
        )) : <p className="text-gray-500 p-4">Không có thời gian rảnh của gia sư</p>}
      </div>
    </div>
  );
};

export default ScheduleFormToChoose;
