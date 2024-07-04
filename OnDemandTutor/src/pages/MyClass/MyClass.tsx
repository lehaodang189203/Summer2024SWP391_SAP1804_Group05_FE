import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { studentApi } from '../../api/student.api'
import { AppContext } from '../../context/app.context'
import { Request } from '../../types/request.type'
import { toast } from 'react-toastify'

export default function MyClass() {
  const { profile } = useContext(AppContext)

  const { data } = useQuery({
    queryKey: ['Account'],
    queryFn: () => studentApi.classActive(profile?.id as string),
    placeholderData: keepPreviousData,
    enabled: !profile?.id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  })

  const classMutation = useMutation({
    mutationFn: (idReq: string) => studentApi.classCompled(idReq)
  })

  const handleCompleteClass = (idRequest: string) => {
    classMutation.mutate(idRequest, {
      onSuccess: () => {
        alert('Kết thúc lớp thành công')
      },
      onError: (data) => {
        toast.error(data.message)
      }
    })
  }

  const requestList = data?.data.data || []
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div>
      {requestList.map((req: Request) => (
        <div
          key={req.idRequest}
          className='rounded-3xl my-5'
          onMouseEnter={() => setHovered(req.idRequest)}
          onMouseLeave={() => setHovered(null)}
        >
          {/*  Parent */}
          <div className='w-[33rem] h-auto rounded-3xl px-5 hover:shadow-2xl hover:shadow-black border-2 mx-auto '>
            <div className='my-2'>
              <h2 className='text-red-600 text-2xl'>{req.title}</h2>
            </div>
            <div className='text-[1rem] text-left'>
              <div>
                Môn dạy:{' '}
                <span className='text-blue-500 font-bold text-md'>
                  {req.subject}
                </span>
              </div>
              <div className='my-1'>
                Lớp dạy:{' '}
                <span className='text-blue-500 font-bold text-md'>
                  {req.class}
                </span>
              </div>
              <div className='my-1'>
                Mức lương:{' '}
                <span className='text-red-400 font-bold text-md'>
                  {req.price}
                </span>
              </div>
              <div className='my-1'>
                Ngày học:{' '}
                <span className='text-black font-bold text-md'>
                  {req.timeTable}
                </span>
              </div>
              <div className='my-1'>
                Thời gian bắt đầu:{' '}
                <span className='text-black font-bold text-md'>
                  {req.timeStart}
                </span>
              </div>
              <div className='my-1'>
                Thời gian kết thúc{' '}
                <span className='text-black font-bold text-md'>
                  {req.timeEnd}
                </span>
              </div>
              <div className='my-1'>
                Hình thức:{' '}
                <span className='text-black font-bold text-md'>
                  {req.learningMethod}
                </span>
              </div>
              <div className='my-1'>
                Mô tả:{' '}
                <span className='text-black font-bold text-md'>
                  {req.description}
                </span>
              </div>
            </div>
          </div>
          <div
            className={`w-[33rem] flex justify-between transition-max-height duration-300 ease-in-out mx-auto ${
              hovered === req.idRequest ? 'max-h-20' : 'max-h-0 overflow-hidden'
            }`}
          >
            <div className='w-[49%] flex items-center justify-center'>
              <button className='w-full bg-pink-400 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-200'>
                Chi tiết
              </button>
            </div>
            <div className='w-[49%] flex items-center justify-center'>
              <button
                onClick={() => {
                  handleCompleteClass(req.idRequest)
                }}
                className='w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-400'
              >
                Kết thúc lớp
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
