import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { serviceSchema, ServiceSchema } from '../../../utils/rules'
import Schedule from '../components/Schedule/Schedule'
import TimeOfSchedule from '../components/TimeOfSchedule'
import Input from '../../../components/Input'
import InputNumber from '../../../components/InputNumber'

interface Props {
  onClose: () => void
}

type FormData = ServiceSchema
const serviceSchemaForm = serviceSchema

export default function ServiceForm({ onClose }: Props) {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(serviceSchemaForm),
    defaultValues: {
      schedule: [{ date: '', timeSlots: [] }]
    }
  })
  const handleConfirmCancel = () => {
    setShowConfirmation(false)
    onClose()
  }

  const onSubmit = (data: FormData) => {
    // API call function
    console.log('Form submitted:', data)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='p-6 h-[42rem] w-full max-w-4xl bg-slate-50 overflow-y-auto shadow-lg mx-auto rounded-lg'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className='text-3xl font-bold mb-4'>Tạo dịch vụ</h1>

          <div className='flex flex-col'>
            <label className='block text-sm font-medium'>Tựa đề</label>
            <Input
              name='title'
              type='text'
              placeholder='Nhập tựa đề'
              register={register}
              classNameInput='w-full p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
              classNameError='text-red-600 mt-1 text-[0.75rem]'
              errorMessage={errors.title?.message}
            />
          </div>
          {/* --------------- */}
          <div className='flex flex-col mb-2'>
            <label className='block text-sm font-medium'>Môn học</label>
            <select
              {...register('subjects')}
              className='w-full p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl text-center'
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
            {errors.subjects && (
              <p className='text-red-600 mt-1 text-[0.75rem]'>
                {errors.subjects.message}
              </p>
            )}
          </div>
          {/* -------------- */}
          <div className='flex flex-col mb-2'>
            <label className='block text-sm font-medium'>Phương thức học</label>
            <select
              {...register('learningMethod')}
              className='w-full p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
            >
              <option value=''>Chọn phương thức học</option>
              <option value='Dạy trực tiếp(offline)'>
                Dạy trực tiếp (offline)
              </option>
              <option value='Dạy trực tuyến (online)'>
                Dạy trực tuyến (online)
              </option>
            </select>
            {errors.learningMethod && (
              <p className='text-red-600 mt-1 text-[0.75rem]'>
                {errors.learningMethod.message}
              </p>
            )}
          </div>
          {/* ----------- */}
          <div className='flex flex-col'>
            <label className='block text-lg font-medium'>Giá</label>
            <Controller
              control={control}
              name='pricePerHour'
              render={({ field }) => (
                <InputNumber
                  inputType='price'
                  placeholder='Nhập học phí'
                  classNameInput='w-full h-[2.75rem] rounded-xl border-2 p-3'
                  classNameError='text-red-600 mt-1 text-[0.75rem] text-center'
                  errorMessage={errors.pricePerHour?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div className='flex flex-col'>
            <label className='block text-lg font-medium'>Chọn lớp</label>
            <select
              {...register('class')}
              className='w-full p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
            >
              <option value='10'>Lớp 10</option>
              <option value='11'>Lớp 11</option>
              <option value='12'>Lớp 12</option>
            </select>
            {errors.class && (
              <p className='text-red-600 mt-1 text-center'>
                {errors.class.message}
              </p>
            )}
          </div>

          <div>
            <Controller
              control={control}
              name='schedule'
              render={({ field }) => (
                <>
                  <Schedule value={field.value} onChange={field.onChange} />
                  <TimeOfSchedule
                    value={field.value}
                    onChange={field.onChange}
                  />
                </>
              )}
            />
          </div>

          <div className='col-span-2 flex justify-between'>
            <div className='w-[49%]'>
              <button
                type='submit'
                className='w-full p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-300 focus:outline-none'
              >
                Nộp
              </button>
            </div>
            <div className='w-[49%]'>
              <button
                type='button'
                onClick={() => setShowConfirmation(true)}
                className='w-full p-3 bg-black text-white rounded-lg hover:bg-gray-500 hover:shadow-lg focus:outline-none'
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
        {showConfirmation && (
          <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-4 rounded-lg'>
              <p className='text-lg mb-4'>Bạn có chắc chắn muốn hủy không?</p>
              <div className='flex justify-end'>
                <button
                  className='px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-600'
                  onClick={() => {
                    setShowConfirmation(false)
                  }}
                >
                  Hủy
                </button>
                <button
                  className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
                  type='button'
                  onClick={handleConfirmCancel}
                >
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
