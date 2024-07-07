<<<<<<< HEAD
import React, { useState } from 'react'
import ScheduleFormToChoose from '../components/ScheduleFormToChose'
import ModalChooseService from '../components/ModalChooseService'
import { useQuery } from '@tanstack/react-query'
import { studentApi } from '../../../api/student.api'
import { ServiceTutor } from '../../../types/request.type'
=======
import React, { useEffect, useState } from 'react';
import ScheduleFormToChoose from '../components/ScheduleFormToChose';
import ModalChooseService from '../components/ModalChooseService';
import { useQuery } from '@tanstack/react-query';
import { studentApi } from '../../../api/student.api';
>>>>>>> 7724be1ef4f74ee21ee82a4aebd5d5c2b70e0b1d

export default function ServiceList() {
  const [selectedClassIndex, setSelectedClassIndex] = useState<number | null>(
    null
  )
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [classData, setClassData] = useState<ServiceTutor[]>([])

<<<<<<< HEAD
  const { data: classService } = useQuery({
    queryKey: ['allServices'],
    queryFn: () => studentApi.GetAllService()
  })

  React.useEffect(() => {
    if (classService) {
      setClassData(classService.data.data)
    }
  }, [classService, setClassData])
  console.log(classService?.data.data)
=======
interface ClassInfo {
  id: string;
  pricePerHour: number;
  tittle: string;
  subject: string;
  class: string;
  description: string;
  learningMethod: string;
  schedule: Schedule[];
}

const ServiceList: React.FC = () => {
  const [classData, setClassData] = useState<ClassInfo[]>([]);
  const [selectedClassIndex, setSelectedClassIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
>>>>>>> 7724be1ef4f74ee21ee82a4aebd5d5c2b70e0b1d

  const { data: fetchedClassData, refetch } = useQuery<ClassInfo[]>({
    queryKey: ['Service'],
    queryFn: async () => {
      try {
        const data = await studentApi.getAllService();
        console.log('Fetched data:', data); // Debugging log
        setClassData(data);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    },
  });

  useEffect(() => {
    if (fetchedClassData) {
      console.log('Fetched class data:', fetchedClassData);
    }
  }, [fetchedClassData]);

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
    console.log('Selected time slot:', selectedTimeSlot) // Handle the actual submission logic
    setIsModalOpen(false)
  }

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', { weekday: 'long' })
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div className='w-2/3 border mx-auto grid gap-4'>
      {classData.map((item, classIndex) => (
<<<<<<< HEAD
        <div
          key={classIndex}
          className='w-full bg-transparent border-2 rounded-2xl grid grid-cols-2 hover:shadow-xl transition-shadow translate-x-4 duration-700'
        >
          <div className='col-span-1 p-4'>
            <h2 className='text-xl font-bold mb-2'>{item.tittle}</h2>
            <div className='text-left h-full mx-auto'>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Môn học:</strong> {item.subject}
              </p>
              <p>
                <strong>Lớp:</strong> {item.class}
              </p>
              <p>
                <strong>Phương thức học:</strong> {item.learningMethod}
              </p>
              <p>
                <strong>Giá(1giờ):</strong> {item.pricePerHour} VNĐ
              </p>
              <p>
                <strong>Mô tả:</strong> {item.description}
              </p>
=======
        <div key={item.id} className="w-full bg-slate-400 rounded-lg grid grid-cols-2">
          <div className="col-span-1 p-4">
            <h2 className="text-xl font-bold mb-2">{item.tittle || 'No Title Available'}</h2>
            <div className="text-left h-full mx-auto">
              <p><strong>ID:</strong> {item.id || 'N/A'}</p>
              <p><strong>Subject:</strong> {item.subject || 'N/A'}</p>
              <p><strong>Class:</strong> {item.class || 'N/A'}</p>
              <p><strong>Learning Method:</strong> {item.learningMethod || 'N/A'}</p>
              <p><strong>Price Per Hour:</strong> {item.pricePerHour || 'N/A'} VNĐ</p>
              <p><strong>Description:</strong> {item.description || 'No description available'}</p>
>>>>>>> 7724be1ef4f74ee21ee82a4aebd5d5c2b70e0b1d
            </div>
          </div>
          <div className='col-span-1 p-4'>
            <p>
              <strong>Thời gian:</strong>
            </p>
            <ScheduleFcormToChoose
              schedule={item.schedule}
              classIndex={classIndex}
              selectedDate={
                selectedClassIndex === classIndex ? selectedDate : ''
              }
              availableHours={
                selectedClassIndex === classIndex
                  ? item.schedule.find((s) => s.date === selectedDate)
                      ?.timeSlots || []
                  : []
              }
              handleDateChange={handleDateChange}
              handleTimeSlotChange={handleTimeSlotChange}
              getDayOfWeek={getDayOfWeek}
              classData={classData} // Pass classData here
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
        selectedTimeSlots={selectedTimeSlot ? [selectedTimeSlot] : []}
        classInfo={
          selectedClassIndex !== null ? classData[selectedClassIndex] : null
        }
      />
    </div>
  )
}
