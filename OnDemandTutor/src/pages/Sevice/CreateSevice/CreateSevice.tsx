import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Schedule from '../components/Schedule/Schedule'
import { serviceSchema } from '../../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import { AppContext } from '../../../context/app.context'
import { tutorApi } from '../../../api/tutor.api'
import { toast } from 'react-toastify'

interface Props {
  onClose: () => void
}

interface FormData {
  pricePerHour: number
  title: string
  subject: string
  class: '10' | '11' | '12'
  description: string
  learningMethod: 'Dạy trực tiếp(offline)' | 'Dạy trực tuyến (online)' | ''
  schedule: ScheduleType[]
}

interface ScheduleType {
  date: string
  timeSlots: string[]
}

const schema = serviceSchema

export default function ServiceForm({ onClose }: Props) {
  const { profile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const [formData, setFormData] = useState<FormData>({
    pricePerHour: 0,
    title: '',
    subject: '',
    class: '10',
    description: '',
    learningMethod: '',
    schedule: []
  })

  const createServiceMutation = useMutation({
    mutationFn: (body: FormData) =>
      tutorApi.createService(profile?.id as string, body)
  })

  const onSubmit = (data: FormData) => {
    console.log('data', data)
    createServiceMutation.mutate(data, {
      onSuccess: (res: any) => {
        toast.success(res.message)
        reset()
        onClose()
      },
      onError: (errors) => {
        console.log(errors)
      }
    })
  }

  const handleScheduleChange = (updatedSchedule: ScheduleType[]) => {
    setValue('schedule', updatedSchedule, { shouldValidate: true })
    setFormData({
      ...formData,
      schedule: updatedSchedule
    })
  }

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target
    setValue(name as keyof FormData, value, { shouldValidate: true })
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='p-6 h-[42rem] w-full max-w-4xl bg-slate-50 overflow-y-auto shadow-lg mx-auto rounded-lg transition-shadow hover:border-white'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-3xl font-bold mb-4'>Tạo dịch vụ</h1>

          <div className='mb-4'>
            <label
              htmlFor='pricePerHour'
              className='block text-sm font-medium text-gray-700'
            >
              Giá mỗi giờ
            </label>
            <input
              type='number'
              id='pricePerHour'
              {...register('pricePerHour')}
              value={formData.pricePerHour}
              onChange={handleInputChange}
              className='border-2  w-full rounded-lg hover:border-pink-400 '
            />
            <p className='text-red-500'>{errors.pricePerHour?.message}</p>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700'
            >
              Tiêu đề
            </label>
            <input
              type='text'
              id='title'
              {...register('title')}
              value={formData.title}
              onChange={handleInputChange}
              className='border-2  w-full rounded-lg hover:border-pink-400 '
            />
            <p className='text-red-500'>{errors.title?.message}</p>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='subject'
              className='block text-sm font-medium text-gray-700'
            >
              Môn học
            </label>
            <select
              id='subject'
              {...register('subject')}
              value={formData.subject}
              onChange={handleInputChange}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
            >
              <option value=''>Chọn môn học</option>
              <option value='Ngữ văn'>Ngữ văn</option>
              <option value='Toán học'>Toán học</option>
              <option value='Vật lý'>Vật lý</option>
              <option value='Hóa học'>Hóa học</option>
              <option value='Sinh học'>Sinh học</option>
              <option value='Lịch sử'>Lịch sử</option>
              <option value='Địa lý'>Địa lý</option>
              <option value='Giáo dục công dân'>Giáo dục công dân</option>
              <option value='Ngoại ngữ'>Ngoại ngữ</option>
              <option value='Tin học'>Tin học</option>
            </select>
            <p className='text-red-500'>{errors.subject?.message}</p>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='class'
              className='block text-sm font-medium text-gray-700'
            >
              Lớp học
            </label>
            <select
              id='class'
              {...register('class')}
              value={formData.class}
              onChange={handleInputChange}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
            >
              <option value='10'>Lớp 10</option>
              <option value='11'>Lớp 11</option>
              <option value='12'>Lớp 12</option>
            </select>
            <p className='text-red-500'>{errors.class?.message}</p>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Mô tả
            </label>
            <textarea
              id='description'
              {...register('description')}
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className='border-2  w-full rounded-lg hover:border-pink-400 '
            />
            <p className='text-red-500'>{errors.description?.message}</p>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='learningMethod'
              className='block text-sm font-medium text-gray-700'
            >
              Phương thức học
            </label>
            <select
              id='learningMethod'
              {...register('learningMethod')}
              value={formData.learningMethod}
              onChange={handleInputChange}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
            >
              <option value=''>Chọn phương thức học</option>
              <option value='Dạy trực tiếp(offline)'>
                Dạy trực tiếp (offline)
              </option>
              <option value='Dạy trực tuyến (online)'>
                Dạy trực tuyến (online)
              </option>
            </select>
            <p className='text-red-500'>{errors.learningMethod?.message}</p>
          </div>

          <Schedule value={formData.schedule} onChange={handleScheduleChange} />
          <p className='text-red-500'>{errors.schedule?.message}</p>

          <div className='col-span-2 flex justify-between mt-4'>
            <div className='w-[49%]'>
              <button
                type='submit'
                className='w-full p-3 bg-pink-600 text-white font-bold rounded-md hover:bg-pink-700'
              >
                Tạo
              </button>
            </div>
            <div className='w-[49%]'>
              <button
                type='button'
                onClick={onClose}
                className='w-full p-3 bg-gray-300 text-gray-800 font-bold rounded-md hover:bg-gray-400'
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
