import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Input from '../../components/Input'
import InputNumber from '../../components/InputNumber'
import { RequiredSchema, requestSchema as Schema } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import { RequestBody } from '../../types/user.request.type'
import { studentApi } from '../../api/student.api'

type FormData = Pick<
  RequiredSchema,
  | 'title'
  | 'date'
  | 'LearningMethod'
  | 'class'
  | 'price'
  | 'subject'
  | 'timeEnd'
  | 'timeStart'
  | 'description'
>
const requestSchema = Schema.pick([
  'title',
  'date',
  'LearningMethod',
  'class',
  'price',
  'subject',
  'timeEnd',
  'timeStart',
  'description'
])
export default function FormRequest() {
  const [showConfirmation, setShowConfirmation] = useState(false) // State để điều khiển hiển thị thông báo
  const [showForm, setShowForm] = useState(true) // State để điều khiển hiển thị form

  // Sử dụng useForm để quản lý form và validation
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(requestSchema)
  })

  const ReqMutation = useMutation({
    mutationFn: (body: RequestBody) => studentApi.createRequest(body)
  })

  // Hàm kiểm tra ngày trong quá khứ
  const validateDate = (value: any) => {
    if (!value) {
      return 'Ngày là bắt buộc' // Thêm kiểm tra nếu không có giá trị ngày
    }
    const selectedDate = new Date(value)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Đặt thời gian của hôm nay về 00:00:00
    return selectedDate >= today || 'Ngày không được ở trong quá khứ'
  }

  // Hàm xử lý khi submit form
  const onSubmit = (data: FormData) => {
    const date = data.date ? new Date(data.date) : new Date()

    const formattedDateOfBirth = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

    console.log({
      ...data,
      date: formattedDateOfBirth
    })

    ReqMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Yêu cầu của bạn đang chờ để xét duyệt')
        // Đóng thông báo xác nhận sau khi submit
        setShowConfirmation(false)
        setShowForm(false)
      },
      onError: (error) => {
        console.log(error)
        // Đóng thông báo xác nhận sau khi submit
        setShowConfirmation(false)
        setShowForm(false)
      }
    })
  }

  const handleCancel = () => {
    setShowConfirmation(true) // Hiển thị thông báo xác nhận
  }

  // Hàm xử lý khi bấm nút Đồng ý trong thông báo xác nhận
  const handleConfirmCancel = () => {
    setShowConfirmation(false)
    // Ẩn form khi đồng ý hủy
    setShowForm(false)
    // Thực hiện các hành động khác khi đồng ý hủy (nếu cần)
  }

  return (
    <div className='container mx-auto p-4'>
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 border-2 rounded-xl p-4 hover:shadow-2xl hover:shadow-black'
        >
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label className='block mb-1 text-lg font-medium'>Tựa đề</label>
              <Input
                name='title'
                type='text'
                placeholder='Nhập tựa đề'
                register={register}
                classNameInput=' w-[35rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
                classNameError='text-red-600 mt-1 text-sm'
                errorMessage={errors.title?.message}
              />
            </div>

            <div className='flex flex-col'>
              <label className='block mb-1 text-lg font-medium'>Môn học</label>
              <select
                {...register('subject')}
                className=' w-[35rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
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
              {errors.subject && (
                <p className='text-red-600 mt-1 text-center'>
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className='flex flex-col'>
              <label className='block mb-1 text-lg font-medium'>
                Phương thức học
              </label>
              <select
                {...register('LearningMethod')}
                className=' w-[35rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
              >
                <option value=''>Chọn phương thức học</option>
                <option value='Dạy trực tiếp(offline)'>
                  Dạy trực tiếp (offline)
                </option>
                <option value='Dạy trực tuyến (online)'>
                  Dạy trực tuyến (online)
                </option>
              </select>
              {errors.LearningMethod && (
                <p className='text-red-600 mt-1 text-center'>
                  {errors.LearningMethod.message}
                </p>
              )}
            </div>

            <div className='flex flex-col'>
              <label className='block mb-1 text-lg font-medium'>Giá</label>

              <Controller
                control={control}
                name='price'
                render={({ field }) => {
                  return (
                    <InputNumber
                      inputType='price'
                      placeholder='Nhập số tiền'
                      classNameError='mt-1 text-red-600 min-h-[1.25rem] text-sm text-'
                      errorMessage={errors.price?.message}
                      {...field}
                    />
                  )
                }}
              />
            </div>

            <div className='flex flex-col'>
              <label className='block mb-1 text-lg font-medium'>Chọn lớp</label>
              <select
                {...register('class')}
                className='w-[35rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
              >
                <option value=''>Chọn lớp</option>
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

            <div className='flex flex-col'>
              <label className='block mb-1 text-lg font-medium'>Ngày học</label>
              <Input
                name='date'
                type='date'
                rules={{ validate: validateDate }}
                register={register}
                classNameInput='p-3  w-[35rem] outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
                classNameError='text-red-600 mt-1 text-sm'
                errorMessage={errors.date?.message}
              />
            </div>

            <div className='flex flex-col'>
              <label className='block mb-1 text-lg font-medium'>
                Thời gian bắt đầu
              </label>
              <Input
                name='timeStart'
                type='time'
                register={register}
                classNameInput=' w-[35rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
                classNameError='text-red-600 mt-1 text-sm'
                errorMessage={errors.timeStart?.message}
                onChange={() => {
                  trigger('timeEnd')
                }}
              />
            </div>

            <div className='flex flex-col'>
              <label className='block mb-1 text-lg font-medium'>
                Thời gian kết thúc
              </label>
              <Input
                name='timeEnd'
                type='time'
                register={register}
                classNameInput='  w-[35rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
                classNameError='text-red-600 mt-1 text-sm'
                errorMessage={errors.timeEnd?.message}
                onChange={() => {
                  trigger('timeStart')
                }}
              />
            </div>
          </div>

          <div className='flex flex-col space-y-2'>
            <label className='font-medium text-gray-700' htmlFor='Description'>
              Mô tả môn học
            </label>
            <textarea
              placeholder='Nhập mô tả môn học của bạn'
              {...register('description')}
              className='p-4 w-full h-32 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl resize-none'
            />
            {errors.description && (
              <span className='text-red-600 mt-1 text-sm'>
                {errors.description.message}
              </span>
            )}
          </div>

          <div className='mt-6 justify-around flex'>
            <div className='w-[49%]'>
              <button
                type='submit'
                className=' w-full p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-300 focus:outline-none'
              >
                Nộp
              </button>
            </div>
            <div className='w-[49%]'>
              <button
                type='button'
                onClick={handleCancel}
                className='w-full p-3 bg-black text-white rounded-lg hover:bg-gray-500 hover:shadow-lg focus:outline-none'
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      )}
      {/* Thông báo xác nhận */}
      {showConfirmation && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-4 rounded-lg'>
            <p className='text-lg mb-4'>Bạn có chắc chắn muốn hủy không?</p>
            <div className='flex justify-end'>
              <button
                className='px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-600'
                role='submit'
                onClick={() => setShowConfirmation(false)} // Đóng thông báo khi bấm nút Hủy
              >
                Hủy
              </button>
              <button
                className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
                type='button'
                onClick={
                  handleConfirmCancel
                  // Thực hiện hành động hủy sau khi xác nhận
                }
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Pagination hoặc các component khác */}
    </div>
  )
}
