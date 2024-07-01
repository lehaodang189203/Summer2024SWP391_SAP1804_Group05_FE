import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Requestchema, requestSchema } from '../../utils/rules'
import Input from '../../components/Input'
import InputNumber from '../../components/InputNumber'
import DateOfWeek from '../../components/DayOfWeek/DayOfWeek'
import { studentApi } from '../../api/student.api'
import { useMutation } from '@tanstack/react-query'
import { RequestBody, RequestResult } from '../../types/user.request.type'
import { toast } from 'react-toastify'
interface FormRequestProps {
  onClose: () => void
}
type FormData = Pick<
  Requestchema,
  | 'class'
  | 'learningMethod'
  | 'description'
  | 'price'
  | 'subject'
  | 'timeEnd'
  | 'timeStart'
  | 'timeTable'
  | 'title'
  | 'totalSessions'
>
const schema = requestSchema.pick([
  'title',
  'timeTable',
  'learningMethod',
  'class',
  'price',
  'subject',
  'timeEnd',
  'timeStart',
  'description',
  'totalSessions'
])

interface FormRequestProps {
  onClose: () => void
  idRequest?: string
}
export default function FormRequest({ onClose, idRequest }: FormRequestProps) {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      class: '10'
    },

    resolver: yupResolver(schema)
  })

  //  tạo
  const ReqMutation = useMutation({
    mutationFn: (body: RequestBody) => studentApi.createRequest(body)
  })

  //  cập nhật
  const UpdateReqMutation = useMutation({
    mutationFn: studentApi.updateRequest
  })

  const onSubmit = handleSubmit((data) => {
    // Lấy chuỗi timetable từ dữ liệu form
    const { timeTable } = data

    // Đếm số lượng mục trong chuỗi timetable
    const totalSessions = timeTable.split(',').length

    // Tạo một đối tượng mới với totalSessions được gán vào
    const newData = {
      ...data,
      totalSessions: totalSessions
    }

    console.log(newData) // In ra đối tượng mới với totalSessions

    if (idRequest) {
      UpdateReqMutation.mutate(
        { idReq: idRequest, dataUpdate: newData },
        {
          onSuccess: (response) => {
            toast.success(response.data.message)
            onClose()
          },
          onError: (error) => {
            toast.error(error.message)
          }
        }
      )
    } else {
      ReqMutation.mutate(newData, {
        onSuccess: () => {
          toast.success('Yêu cầu của bạn đang chờ để xét duyệt')
          onClose()
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }
  })

  const handleConfirmCancel = () => {
    setShowConfirmation(false)
    onClose()
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='p-6 h-[45rem]'>
          <div className='container mx-auto p-4'>
            <form
              onSubmit={onSubmit}
              className='w-[50rem] h-auto space-y-4 border-2 rounded-xl p-4 bg-white shadow-black shadow-lg'
            >
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                  <label className='block text-sm font-medium'>Tựa đề</label>
                  <Input
                    name='title'
                    type='text'
                    placeholder='Nhập tựa đề'
                    register={register}
                    classNameInput='w-[20rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
                    classNameError='text-red-600 mt-1 text-[0.75rem]'
                    errorMessage={errors.title?.message}
                  />
                </div>

                <div className='flex flex-col'>
                  <label className='block text-sm font-medium'>Môn học</label>
                  <select
                    {...register('subject')}
                    className='ml-10 w-[20rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
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
                    <p className='text-red-600 mt-1 text-[0.75rem]'>
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className='flex flex-col'>
                  <label className='block text-lg font-medium'>
                    Phương thức học
                  </label>
                  <select
                    {...register('learningMethod')}
                    className='ml-8 text-sm w-[20rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
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
                <div className='flex flex-col'>
                  <label className='block text-lg font-medium'>Giá</label>

                  <Controller
                    control={control}
                    name='price'
                    render={({ field }) => {
                      return (
                        <InputNumber
                          inputType='price'
                          placeholder='Nhập học phí'
                          classNameInput='ml-10 w-[20rem] h-[2.75rem] rounded-xl border-2 p-3'
                          classNameError='text-red-600 mt-1 text-[0.75rem] text-center'
                          errorMessage={errors.price?.message}
                          {...field}
                        />
                      )
                    }}
                  />
                </div>

                <div className='flex flex-col'>
                  <label className='block text-lg font-medium'>Chọn lớp</label>
                  <select
                    {...register('class')}
                    className='ml-10 w-[20rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
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
                {/* Các trường khác của form */}
                <div>
                  <label>Thời khóa biểu</label>
                  <Controller
                    control={control}
                    name='timeTable'
                    render={({ field }) => (
                      <DateOfWeek
                        value={field.value} // Sử dụng field.value thay vì value trực tiếp
                        onChange={field.onChange} // Sử dụng field.onChange thay vì onChange trực tiếp
                        errorMessage={errors.timeTable?.message}
                      />
                    )}
                  />
                </div>

                <div className='flex flex-col'>
                  <label className='block text-lg font-medium'>
                    Thời gian bắt đầu
                  </label>
                  <Input
                    name='timeStart'
                    type='time'
                    register={register}
                    classNameInput='ml-10 w-[20rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
                    classNameError='text-red-600 mt-1 text-[0.75rem]'
                    errorMessage={errors.timeStart?.message}
                    // onChange={() => {
                    //   trigger('timeEnd')
                    // }}
                  />
                </div>

                <div className='flex flex-col'>
                  <label className='block text-lg font-medium'>
                    Thời gian kết thúc
                  </label>
                  <Input
                    name='timeEnd'
                    type='time'
                    register={register}
                    classNameInput='ml-10 w-[20rem] p-3 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl'
                    classNameError='text-red-600 mt-1 text-[0.75rem]'
                    errorMessage={errors.timeEnd?.message}
                    onChange={() => {
                      trigger('timeStart')
                    }}
                  />
                </div>
              </div>

              <div className='flex flex-col space-y-2'>
                <label
                  className='font-medium text-gray-700'
                  htmlFor='Description'
                >
                  Mô tả môn học
                </label>
                <textarea
                  placeholder='Nhập mô tả môn học của bạn'
                  {...register('description')}
                  className='p-4 w-full h-32 outline-none border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-xl resize-none'
                />
                {errors.description && (
                  <span className='text-red-600 mt-1 text-[0.75rem]'>
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className='mt-6 justify-around flex'>
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
            {/* Thông báo xác nhận */}
            {showConfirmation && (
              <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
                <div className='bg-white p-4 rounded-lg'>
                  <p className='text-lg mb-4'>
                    Bạn có chắc chắn muốn hủy không?
                  </p>
                  <div className='flex justify-end'>
                    <button
                      className='px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-600'
                      role='submit'
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
      </div>
    </div>
  )
}
