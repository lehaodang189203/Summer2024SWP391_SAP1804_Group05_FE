import React, { useState } from 'react';
import ScheduleFormToChoose from '../components/ScheduleFormToChose';
import ModalChooseService from '../components/ModalChooseService';

interface Schedule {
  date: string;
  timeSlots: string[];
}

interface ClassInfo {
    id:string
  pricePerHour: number;
  title: string;
  subject: string;
  class: string;
  description: string;
  learningMethod: string;
  schedule: Schedule[];
}

const data: ClassInfo[] = [
  {
    id:"xxx",
    pricePerHour: 100000,
    title: 'Lớp toán con cá',
    subject: 'Toán học',
    class: '10',
    description: 'Có cái nhìn sâu sắc về toán học nhoa',
    learningMethod: 'Online',
    schedule: [
      {
        date: '2024-07-10',
        timeSlots: ['10:00', '14:00'],
      },
      {
        date: '2024-07-11',
        timeSlots: ['12:00', '14:00'],
      },
    ],
  },
  { id:"xtx",
    pricePerHour: 200000,
    title: 'Lớp toán con cú',
    subject: 'Toán học',
    class: '10',
    description: 'Có cái nhìn sâu sắc hơn nữa về toán học nhoa',
    learningMethod: 'Online',
    schedule: [
      {
        date: '2024-07-13',
        timeSlots: ['10:00', '14:00'],
      },
      {
        date: '2024-07-18',
        timeSlots: ['15:00', '17:00'],
      },
    ],
  },
  // Add more class data here
];

const ServiceList: React.FC = () => {
  const [classData, setClassData] = useState<ClassInfo[]>(data);
  const [selectedClassIndex, setSelectedClassIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDateChange = (classIndex: number, date: string) => {
    setSelectedClassIndex(classIndex);
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotChange = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSubmit = () => {
    if (selectedClassIndex === null) return;

    const newClassData = [...classData];
    const scheduleIndex = newClassData[selectedClassIndex].schedule.findIndex(s => s.date === selectedDate);
    if (scheduleIndex === -1) return;

    newClassData[selectedClassIndex].schedule[scheduleIndex].timeSlots = selectedTimeSlot ? [selectedTimeSlot] : [];
    setClassData(newClassData);
    console.log('Selected time slot:', selectedTimeSlot); // Handle the actual submission logic
    setIsModalOpen(false);
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { weekday: 'long' });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-2/3 border mx-auto grid gap-4">
      {classData.map((item, classIndex) => (
        <div key={classIndex} className="w-full bg-slate-400 rounded-lg grid grid-cols-2">
          <div className="col-span-1 p-4">
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <div className="text-left h-full mx-auto">
            <p><strong>Subject:</strong> {item.id}</p>
              <p><strong>Subject:</strong> {item.subject}</p>
              <p><strong>Class:</strong> {item.class}</p>
              <p><strong>Learning Method:</strong> {item.learningMethod}</p>
              <p><strong>Price Per Hour:</strong> {item.pricePerHour} VNĐ</p>
              <p><strong>Description:</strong> {item.description}</p>
            </div>
          </div>
          <div className="col-span-1 p-4">
            <p><strong>Thời gian:</strong></p>
            <ScheduleFormToChoose
              classIndex={classIndex}
              selectedDate={selectedClassIndex === classIndex ? selectedDate : ''}
              availableHours={selectedClassIndex === classIndex ? item.schedule.find(s => s.date === selectedDate)?.timeSlots || [] : []}
              handleDateChange={handleDateChange}
              handleTimeSlotChange={handleTimeSlotChange}
              getDayOfWeek={getDayOfWeek}
            />
            {selectedClassIndex === classIndex && selectedTimeSlot && (
              <button
                type="button"
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
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
        classInfo={selectedClassIndex !== null ? classData[selectedClassIndex] : null}
      />
    </div>
  );
};

export default ServiceList;
