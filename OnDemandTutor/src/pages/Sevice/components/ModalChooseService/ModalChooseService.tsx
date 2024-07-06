import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { studentApi } from '../../../../api/student.api'; // Ensure the path to your API file is correct
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedDate: string;
  selectedTimeSlots: string[];
  classInfo: {
    id: string;
    pricePerHour: number;
    tittle: string;
    subject: string;
    class: string;
    description: string;
    learningMethod: string;
  } | null;
}

const ModalChooseService: React.FC<Props> = ({
  isOpen, onClose, onConfirm, selectedDate, selectedTimeSlots, classInfo
}) => {
  const [duration, setDuration] = useState<number>(30);

  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(Number(event.target.value));
  };

  const calculateTotalPrice = () => {
    return (classInfo?.pricePerHour || 0 ) * duration/60;
  };

  const bookServiceMutation = useMutation({
    mutationFn: (body: any) => studentApi.BookingServiceLearning(classInfo?.id || '', body),
    onSuccess: (data: any) => {
      console.log('data res', data);
      toast.success(data.message)
      onConfirm(); // Call the parent onConfirm function to close the modal
    },
    onError: (error) => {
      console.error('lỗi trong quá trình booking:', error);
    }
  });

  const handleConfirm = () => {
    if (!classInfo) return;

    const bookingData = {
      duration,
      price: calculateTotalPrice(),
      date: selectedDate,
      timeAvalable: selectedTimeSlots.join(', ')
    };
    console.log('bookingData', bookingData);
    bookServiceMutation.mutate(bookingData);
  };

  if (!isOpen || !classInfo) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/2">
        <h2 className="text-2xl mb-4">Confirm Selection</h2>
        <p><strong>ID:</strong> {classInfo.id}</p>
        <p><strong>Class:</strong> {classInfo.class}</p>
        <p><strong>Date:</strong> {selectedDate}</p>
        <p><strong>Time Slot:</strong> {selectedTimeSlots.join(', ')}</p>
        <label className="block mt-4">
          <span className="text-gray-700">Xác nhận dịch vụ000000000000000:</span>
          <select
            value={duration}
            onChange={handleDurationChange}
            className="block w-full mt-1 border-gray-300 rounded-md"
          >
            <option value={30}>30 minutes</option>
            <option value={60}>60 minutes</option>
            <option value={90}>90 minutes</option>
            <option value={120}>120 minutes</option>
            <option value={150}>150 minutes</option>
            <option value={180}>180 minutes</option>
          </select>
        </label>
        <p className="mt-4"><strong>Total Price:</strong> {calculateTotalPrice()} VNĐ</p>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChooseService;
